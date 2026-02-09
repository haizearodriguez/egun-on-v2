import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TodayVM } from '../models/today.model';

@Injectable({ providedIn: 'root' })
export class TodayService {
  async getToday(payload: any): Promise<TodayVM> {
    const url = `${environment.proxyUrl}/today`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(`${res.status} ${text}`);
    return JSON.parse(text) as TodayVM;
  }
}
