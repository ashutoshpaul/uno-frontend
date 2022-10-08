import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  MatDialogModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [],
  exports: modules,
})
export class MaterialModule { }
