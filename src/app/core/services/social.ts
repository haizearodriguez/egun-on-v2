import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type SocialUser = {
  userId: string;
  name: string;
  status: 'walking' | 'later';
  untilMs: number;
  updatedAtMs: number;
};

@Injectable({ providedIn: 'root' })
export class SocialService {
  private base = environment.proxyUrl;

  async state(groupId: string): Promise<{ now: number; active: SocialUser[] }> {
    const url = `${this.base}/social/state?groupId=${encodeURIComponent(groupId)}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async setStatus(payload: { groupId: string; userId: string; name: string; status: 'walking' | 'later'; untilMs: number }) {
    const url = `${this.base}/social/status`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async stop(payload: { groupId: string; userId: string }) {
    const url = `${this.base}/social/stop`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
}
