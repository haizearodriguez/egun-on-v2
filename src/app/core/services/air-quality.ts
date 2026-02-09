import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type AirQualityParams = {
  countyId: string;        // "48"
  municipalityId: string;  // "001"
  from: string;            // "2023-12-31T00:00"
  to: string;              // "2023-12-31T23:59"
  lang?: string;           // "SPANISH"
};

@Injectable({ providedIn: 'root' })
export class AirQualityService {
  private base = environment.proxyUrl;

  async getHourlyMeasurements(p: AirQualityParams) {
    return await this.postJson(`${this.base}/air-quality`, {
      countyId: p.countyId,
      municipalityId: p.municipalityId,
      from: p.from,
      to: p.to,
      lang: p.lang ?? 'SPANISH',
    });
  }

  private async postJson(url: string, body: unknown) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });


    const raw = await res.text();
    if (!res.ok) throw new Error(`${res.status} ${raw}`);

    return raw ? JSON.parse(raw) : null;
  }
}
