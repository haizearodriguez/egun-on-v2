import { DateAdapterService } from './../../core/services/date-adapter';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MeteoService } from 'src/app/core/services/meteo';
import { TrafficService } from 'src/app/core/services/traffic';
import { AirQualityService } from 'src/app/core/services/air-quality';
import { TodayService} from 'src/app/core/services/today';

import { MeteoRoot } from 'src/app/core/models/meteo.model';
import { AirQualityRoot } from 'src/app/core/models/air.model';
import { TrafficRoot } from 'src/app/core/models/traffic.model';
import { TodayVM } from 'src/app/core/models/today.model';

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
  vm: TodayVM | null = null;

  constructor(
    private todayService: TodayService,
    private dates: DateAdapterService,
  ) {}

  ngOnInit() {
    this.refresh();
  }

  async refresh(event?: any) {
    this.loading = true;
    this.error = null;

    try {
      // reutiliza tus helpers actuales
      const { from, to } = this.dates.todayAirRange();
      const forDate = this.dates.todayYYYYMMDD();
      const d = new Date();

      // TODO: luego esto vendrá del onboarding (municipio/zona)
      const payload = {
        euskalmetPath:
          `/euskalmet/weather/regions/basque_country/zones/great_bilbao/locations/bilbao/forecast/at/` +
          `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}` +
          `/for/${forDate}`,
        countyId: '48',
        municipalityId: '001',
        from,
        to,
        lang: 'SPANISH',
        traffic: {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate(),
          lat: 43.263,
          lon: -2.935,
          km: 5,
          page: 1,
        },
      };

      this.vm = await this.todayService.getToday(payload);
    } catch (e: any) {
      this.error = e?.message ?? String(e);
      this.vm = null;
    } finally {
      this.loading = false;
      event?.target?.complete?.();
    }
  }

  // helpers UI
  badgeIcon(b: string) {
    const s = b.toLowerCase();
    if (s.includes('aire')) return 'leaf';
    if (s.includes('incid')) return 'checkmark-circle';
    if (s.includes('lluv')) return 'umbrella';
    return 'information-circle';
  }

  recIcon(type: string) {
    if (type === 'walk') return 'walk';
    if (type === 'run') return 'fitness';
    return 'warning';
  }

  windowLabel(status: 'best' | 'ok' | 'avoid') {
    if (status === 'best') return 'Mejor';
    if (status === 'ok') return 'OK';
    return 'Evitar';
  }

  windowClass(status: 'best' | 'ok' | 'avoid') {
    return status === 'best' ? 'win best' : status === 'ok' ? 'win ok' : 'win avoid';
  }
}
