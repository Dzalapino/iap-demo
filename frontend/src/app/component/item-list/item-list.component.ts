import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsService } from 'src/app/service/items.service';
import { Item } from 'src/model/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;

  selectedItem: Item | undefined;

  constructor(private itemService: ItemsService) {
    this.items$ = this.itemService.getItems();
  }

  setSelectedItem(item: Item): void {
    this.selectedItem = item;
  }

  ngOnInit(): void {}
}
