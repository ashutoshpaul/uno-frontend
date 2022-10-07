import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent implements OnInit {

  constructor(
    private readonly _dialogRef: MatDialogRef<OptionsDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  exit(): void {}

}
