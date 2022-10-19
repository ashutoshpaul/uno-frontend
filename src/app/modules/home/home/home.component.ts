import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { enterButtonTrigger } from '../../../dashboard-animations.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    enterButtonTrigger
  ]
})
export class HomeComponent implements OnInit {

  playerNameControl: FormControl;

  private _isBlurred: boolean = true;

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
    }
  }

  goToLobby(): void {
    if(!this.isInvalid) {
      this._sessionStorage.setItem('playerName', this.playerNameControl.value);
      this._router.navigate(['lobby'], { relativeTo: this._activatedRoute });
    }
  }

  inputBlurred(isBlur: boolean = true): void {
    this.isBlur = isBlur;
  }

  get isBlur(): boolean { return this._isBlurred; }

  set isBlur(isBlur: boolean) { this._isBlurred = isBlur; }

  get isInvalid(): boolean {
    return this.playerNameControl.invalid;
  }

  get isDirty(): boolean {
    return this.playerNameControl.dirty;
  }

  get errorMessage(): string {
    if (this.playerNameControl.hasError("required")) { return "Enter value"; }
    if (this.playerNameControl.hasError("minlength")) { return "Should be more than 2 letters"; }
    if (this.playerNameControl.hasError("maxlength")) { return "Should be less than 16 letter"; }
    if (this.playerNameControl.hasError("pattern")) { return "Only letter and digits allowed"; }
    return null;
  }

}