import { Preferences } from '../core/models/user-prefs.model';
import { StorageService } from '../core/services/storage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSegment, IonSegmentButton, IonLabel,
  IonItem, IonInput,
  IonCheckbox,
  IonRadioGroup, IonRadio,
  IonSelect, IonSelectOption,
  IonButton, IonText
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonLabel,
    IonItem, IonInput,
    IonCheckbox,
    IonRadioGroup, IonRadio,
    IonSelect, IonSelectOption,
    IonButton, IonText,
  ],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  prefs: Preferences = {
    municipalityCode: '',
    goals: {
      cleanAir: false,
      quiet: false,
      stressFree: false,
      performance: false,
    },
    sensitivity: 'normal',
    activities: {
      walk: false,
      run: false,
      bike: false,
    },
    typicalDurationMin: 30,
    notifications: 'off',
  };

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    const savedPrefs = await this.storageService.getPreferences();
    if (savedPrefs) {
      this.prefs = savedPrefs;
    }
  }

  async save() {
    await this.storageService.setPreferences(this.prefs);
    console.log('Preferencias guardadas:', this.prefs);
    this.router.navigate(['/tabs/today']);
  }
}
