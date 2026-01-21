import { StorageService } from '../../core/services/storage';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonSelect, IonSelectOption, IonButton
} from '@ionic/angular/standalone';

import { Preferences } from '../../core/models/user-prefs.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonSelect, IonSelectOption, IonButton
  ],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  prefs: Preferences = {
    municipalityCode: '',
    goals: { cleanAir: false, quiet: false, stressFree: false, performance: false },
    sensitivity: 'normal',
    activities: { walk: false, run: false, bike: false },
    typicalDurationMin: 30,
    notifications: 'off',
  };

  constructor(private storage: StorageService, private router: Router) {}

  async ionViewWillEnter() {
    const saved = await this.storage.getPreferences();
    if (saved) this.prefs = saved;
  }

  async save() {
    await this.storage.setPreferences(this.prefs);
  }

  async resetOnboarding() {
    await this.storage.clearPreferences();
    this.router.navigate(['/home']);
  }
}
