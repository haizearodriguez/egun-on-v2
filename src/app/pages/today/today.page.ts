import { DateAdapterService } from './../../core/services/date-adapter';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MeteoService } from 'src/app/core/services/meteo';
import { TrafficService } from 'src/app/core/services/traffic';
import { AirQualityService } from 'src/app/core/services/air-quality';

import { MeteoRoot } from 'src/app/core/models/meteo.model';
import { AirQualityRoot } from 'src/app/core/models/air.model';
import { TrafficRoot } from 'src/app/core/models/traffic.model';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage implements OnInit {
  loading = false;
  error: string | null = null;

  forecast: MeteoRoot | null = null;
  airQuality: AirQualityRoot | null = null;
  trafficQuality: TrafficRoot | null = null;

  constructor(
    private meteo: MeteoService,
    private air: AirQualityService,
    private traffic: TrafficService,
    private dates: DateAdapterService
  ) {}

  ngOnInit() {
    this.refresh(); // primera carga
  }

  async refresh(event?: CustomEvent) {
    this.loading = true;
    this.error = null;

    try {
      // FECHAS CENTRALIZADAS
      const { from, to } = this.dates.todayAirRange();
      console.log(from, to);
      const forDate = this.dates.todayYYYYMMDD();
      const today = new Date();

      // METEO
      this.forecast = await this.meteo.getForecast({
        regionId: 'basque_country',
        zoneId: 'great_bilbao',
        locId: 'bilbao',
        at: {
          yyyy: today.getFullYear(),
          mm: today.getMonth() + 1,
          dd: today.getDate(),
        },
        forDate,
      });

      // AIRE (ISO LOCAL SIN Z)
      this.airQuality = await this.air.getHourlyMeasurements({
        countyId: '48',
        municipalityId: '001',
        from,
        to,
        lang: 'SPANISH',
      });

      // TRÁFICO
      this.trafficQuality = await this.traffic.getIncidencesByDateAndLocation({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
        lat: 43.263,
        lon: -2.935,
        km: 5,
        page: 1,
      });

    } catch (e: any) {
      this.error = e?.message ?? String(e);
    } finally {
      this.loading = false;
      event?.target && (event.target as any).complete?.();
    }
  }
}
