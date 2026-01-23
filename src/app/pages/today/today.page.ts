import { Component, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/core/services/meteo';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage implements OnInit {
  loading = false;
  error: string | null = null;
  data: any = null;

  constructor(private meteo: MeteoService) {}

  async ngOnInit() {
    this.loading = true;
    try {
      this.data = await this.meteo.getForecast({
        regionId: 'basque_country',
        zoneId: 'great_bilbao',
        locId: 'bilbao',
        at: { yyyy: 2022, mm: 9, dd: 26 },
        forDate: '20220927',
      });
    } catch (e: any) {
      this.error = e?.message ?? String(e);
    } finally {
      this.loading = false;
    }
  }
}
