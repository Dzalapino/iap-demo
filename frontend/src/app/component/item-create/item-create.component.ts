import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/service/items.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
})
export class ItemCreateComponent {
  form = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private itemService: ItemsService,
    private formBuilder: FormBuilder
  ) {}

  createItem(): void {
    let name = this.form.controls.name.getRawValue() || 'NAME';
    let desc = this.form.controls.description.getRawValue() || 'DESC';

    this.itemService.createItem(name, desc).subscribe();
  }
}
