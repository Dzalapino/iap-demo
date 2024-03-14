from fastapi import APIRouter, HTTPException, status
from typing import List
from sqlmodel import select
from pydantic import BaseModel

from repository.db_connection import get_session
from repository.models import Item


item_router = APIRouter()


class ItemDto(BaseModel):
    name: str
    description: str = None


@item_router.get('/items/', response_model=List[Item])
def get_all_items():
    with get_session() as session:
        items = session.exec(select(Item)).all()
        return items


@item_router.post('/items/', response_model=Item)
def create_item(item: ItemDto):
    with get_session() as session:
        item_mapped = Item.from_orm(item)
        session.add(item_mapped)
        session.commit()
        session.refresh(item_mapped)
        return item_mapped


@item_router.put('/items/{item_id}', response_model=Item)
def update_item(item_id: int, item: ItemDto):
    with get_session() as session:
        db_item = session.get(Item, item_id)
        if db_item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
        update_data = item.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_item, key, value)
        session.add(db_item)
        session.commit()
        session.refresh(db_item)
        return db_item


@item_router.delete('/items/{item_id}', response_model=Item)
def delete_item(item_id: int):
    with get_session() as session:
        item = session.get(Item, item_id)
        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
        session.delete(item)
        session.commit()
        return item
