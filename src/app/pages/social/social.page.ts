import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocialService, SocialUser } from 'src/app/core/services/social';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// helper: id local pseudoaleatorio
function getOrCreateLocalId(key: string) {
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const id = 'u_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  localStorage.setItem(key, id);
  return id;
}

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  imports: [CommonModule, IonicModule],
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit, OnDestroy {
  loading = false;
  error: string | null = null;

  // 👇 en MVP usa municipio como groupId (luego vendrá del onboarding)
  groupId = 'bilbao';

  // 👇 nombre simple (en MVP: input en settings; aquí hardcode)
  myName = localStorage.getItem('myName') ?? 'Yo';

  myUserId = getOrCreateLocalId('localUserId');

  goodMomentText = 'La ciudad está tranquila ahora.'; // si quieres, lo conectamos a /today
  people: Array<{ name: string; when: string }> = [];

  sharing = false;
  private timer: any;

  constructor(private social: SocialService) {}

  ngOnInit() {
    this.refresh();
    this.timer = setInterval(() => this.refresh(true), 30000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  async refresh(silent = false) {
    if (!silent) this.loading = true;
    this.error = null;

    try {
      const { now, active } = await this.social.state(this.groupId);
      this.people = active.map((u) => ({
        name: u.name,
        when: u.status === 'walking' ? 'ahora' : this.formatUntil(u.untilMs),
      }));
      this.sharing = active.some((u) => u.userId === this.myUserId);
    } catch (e: any) {
      this.error = e?.message ?? String(e);
    } finally {
      this.loading = false;
    }
  }

  async goNow() {
    const untilMs = Date.now() + 60 * 60 * 1000; // 60 min
    await this.social.setStatus({
      groupId: this.groupId,
      userId: this.myUserId,
      name: this.myName,
      status: 'walking',
      untilMs,
    });
    await this.refresh(true);
  }

  async goLater() {
    const untilMs = Date.now() + 60 * 60 * 1000; // simple: “luego” = 60 min
    await this.social.setStatus({
      groupId: this.groupId,
      userId: this.myUserId,
      name: this.myName,
      status: 'later',
      untilMs,
    });
    await this.refresh(true);
  }

  async stopSharing() {
    await this.social.stop({ groupId: this.groupId, userId: this.myUserId });
    await this.refresh(true);
  }

  private formatUntil(ms: number) {
    const d = new Date(ms);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }
}

