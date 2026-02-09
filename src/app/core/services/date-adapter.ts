import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateAdapterService {
  private pad2(n: number) {
    return String(n).padStart(2, '0');
  }

  /** Formato requerido: YYYY-MM-DDTHH:mm (sin segundos, sin Z) */
  toAirString(d: Date): string {
    return `${d.getFullYear()}-${this.pad2(d.getMonth() + 1)}-${this.pad2(d.getDate())}` +
           `T${this.pad2(d.getHours())}:${this.pad2(d.getMinutes())}`;
  }

  /** Rango de HOY completo en formato AIR */
  todayAirRange(now: Date = new Date()) {
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();

    return {
      from: this.toAirString(new Date(y, m, d, 0, 0)),
      to:   this.toAirString(new Date(y, m, d, 23, 59)),
    };
  }

  /** Para meteo (YYYYMMDD) */
  todayYYYYMMDD(now: Date = new Date()) {
    const y = now.getFullYear();
    const m = this.pad2(now.getMonth() + 1);
    const d = this.pad2(now.getDate());
    return `${y}${m}${d}`;
  }
}
