import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/service/items.service';
import { Item } from 'src/model/item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  @Input() item!: Item;

  editMode = false;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private itemService: ItemsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.setValue({
      name: this.item.name,
      description: this.item.description,
    });
  }

  updateItem(): void {
    let name = this.form.controls.name.getRawValue() || 'NAME';
    let desc = this.form.controls.description.getRawValue() || 'DESC';

    this.itemService
      .updateItem({ id: this.item.id, name, description: desc })
      .subscribe((item) => {
        this.item = item;
        this.toggleEditMode();
      });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe();
  }

  toggleEditMode(): void {
    this.form.setValue({
      name: this.item.name,
      description: this.item.description,
    });
    this.editMode = !this.editMode;
  }
}
