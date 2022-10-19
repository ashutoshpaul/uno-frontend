import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const modules = [
  MatDialogModule,
  MatIconModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatBadgeModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  exports: modules,
})
export class MaterialModule { }
