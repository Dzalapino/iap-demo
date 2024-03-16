import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from 'src/model/item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items: Item[] = [
    { id: 1, name: 'A', description: 'AAAA' },
    { id: 2, name: 'B', description: 'DDDD' },
    { id: 3, name: 'C', description: 'CCCC' },
  ];

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + '/items');
    // return of(this.items);
  }

  createItem(name: string, description: string): Observable<Item> {
    return this.http.post<Item>(this.baseUrl + '/items/', {
      name,
      description,
    });
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.baseUrl + '/items/' + item.id, {
      name: item.name,
      description: item.description,
    });
  }

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(this.baseUrl + '/items/' + id);
  }
}
