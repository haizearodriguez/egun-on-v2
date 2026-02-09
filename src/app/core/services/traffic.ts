import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type TrafficParams = {
  year: number;   // 2026
  month: number;  // 1..12
  day: number;    // 1..31
  lat: number;    // según API
  lon: number;    // según API
  km: number;     // según API
  page?: number;  // _page
};

@Injectable({ providedIn: 'root' })
export class TrafficService {
  private base = environment.proxyUrl;

  async getIncidencesByDateAndLocation(p: TrafficParams) {
    return await this.postJson(`${this.base}/traffic`, {
      year: p.year,
      month: p.month,
      day: p.day,
      lat: p.lat,
      lon: p.lon,
      km: p.km,
      page: p.page ?? 1,
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
