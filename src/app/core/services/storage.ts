import { Injectable } from '@angular/core';
import { Preferences } from '../models/user-prefs.model';

const KEY_PREFS = 'preferences';

@Injectable({ providedIn: 'root' })
export class StorageService {

  async getPreferences(): Promise<Preferences | null> {
    const raw = localStorage.getItem(KEY_PREFS);
    return raw ? JSON.parse(raw) as Preferences : null;
  }

  async setPreferences(prefs: Preferences): Promise<void> {
    localStorage.setItem(KEY_PREFS, JSON.stringify(prefs));
  }

  async clearPreferences(): Promise<void> {
    localStorage.removeItem(KEY_PREFS);
  }
}
