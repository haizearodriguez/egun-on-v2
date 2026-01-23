import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MeteoService {
  async getForecast(params: {
    regionId: string;
    zoneId: string;
    locId: string;
    at: { yyyy: number; mm: number; dd: number };
    forDate: string; // YYYYMMDD
  }) {
    const { regionId, zoneId, locId, at, forDate } = params;

    const path =
      `/euskalmet/weather/regions/${encodeURIComponent(regionId)}` +
      `/zones/${encodeURIComponent(zoneId)}` +
      `/locations/${encodeURIComponent(locId)}` +
      `/forecast/at/${at.yyyy}/${String(at.mm).padStart(2, '0')}/${String(at.dd).padStart(2, '0')}` +
      `/for/${encodeURIComponent(forDate)}`;

    const res = await fetch(environment.euskalmetProxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, method: 'GET' }),
    });

    const raw = await res.text(); // leer 1 vez
    if (!res.ok) throw new Error(`${res.status} ${raw}`);

    return raw ? JSON.parse(raw) : null;
  }
}
