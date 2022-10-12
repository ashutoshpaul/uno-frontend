import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  playerName: FormControl = new FormControl('', [
    Validators.required, 
    Validators.minLength(3), 
    Validators.maxLength(15),
    Validators.pattern('[a-zA-Z0-9]+'),
  ]);

  isNameValid: boolean = false;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  ngOnInit(): void {
    this.playerName.valueChanges.subscribe(_ => {
      this.isNameValid = !this.playerName.invalid;
    });
  }

  goToLobby(): void {
    this._sessionStorage.setItem('playerName', this.playerName.value);
    this._router.navigate(['lobby'], { relativeTo: this._activatedRoute });
  }

  isPatternValid(): boolean {
    return !!this.playerName.errors?.pattern;
  }

}