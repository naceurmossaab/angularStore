import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../model/product';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [
    NzModalModule,
    NgIf,
    NzSelectModule,
    NzSwitchModule,
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule
  ],
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        animate('300ms ease-in'),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AddProductModalComponent {
  @Output() productAdded = new EventEmitter<IProduct>();
  isVisible = false;
  addProductForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      name: ['',
        [Validators.required]],
      price: [null,
        [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      description: [''],
      availability: [true],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.addProductForm.valid) {
      const newProduct: IProduct = {
        id: Date.now(),
        ...this.addProductForm.value,
      };
      this.productAdded.emit(newProduct);
      this.isVisible = false;
      this.addProductForm.reset({ inStock: true });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.addProductForm.reset({ inStock: true });
  }
}

