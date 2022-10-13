import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { enterButtonTrigger } from './../../dashboard-animations.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    enterButtonTrigger
  ]
})
export class HomeComponent implements OnInit {

  invalidPatternMessage: string = 'Only letters and digits allowed';

  playerNameControl: FormControl;

  isNameValid: boolean = false;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.playerNameControl = this._formBuilder.control('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern('[a-zA-Z0-9]+'), // only letters and digits allowed
    ]);

    const savedName: string = this._sessionStorage.getItem('playerName');

    if (savedName) {
      this.playerNameControl.setValue(savedName);
      this.isNameValid = !this.playerNameControl.invalid;
    }
    this.playerNameControl.valueChanges.subscribe(_ => {
      this.isNameValid = !this.playerNameControl.invalid;
    });
  }

  goToLobby(): void {
    this._sessionStorage.setItem('playerName', this.playerNameControl.value);
    this._router.navigate(['lobby'], { relativeTo: this._activatedRoute });
  }

  isPatternValid(): boolean {
    return !!this.playerNameControl.errors?.pattern;
  }

}