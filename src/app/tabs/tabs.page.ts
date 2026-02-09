import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="today" href="/tabs/today">
          <ion-icon name="calendar-number-outline"></ion-icon>
          <ion-label>Hoy</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="social" href="/tabs/social">
          <ion-icon name="people-outline"></ion-icon>
          <ion-label>Social</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon name="settings-outline"></ion-icon>
          <ion-label>Ajustes</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsPage {}
