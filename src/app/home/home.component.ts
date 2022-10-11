import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// import {
//   debounceTime,
//   distinctUntilChanged,
// } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  playerName: FormControl = new FormControl('', [
    Validators.required, Validators.minLength(3), Validators.maxLength(15)
  ]);

  isNameValid: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.playerName.valueChanges.pipe(
      // debounceTime(500), distinctUntilChanged()
    ).subscribe(_ => {
      this.isNameValid = !this.playerName.invalid;
    });
  }

}