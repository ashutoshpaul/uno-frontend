import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

const modules = [
  MatDialogModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  exports: modules,
})
export class MaterialModule { }
