export type Sensitivity = 'low' | 'normal' | 'high';
export type NotificationLevel = 'off' | 'important' | 'normal';

export interface Preferences {
  municipalityCode: string;

  goals: {
    cleanAir: boolean;
    quiet: boolean;
    stressFree: boolean;
    performance: boolean;
  };

  sensitivity: Sensitivity;

  activities: {
    walk: boolean;
    run: boolean;
    bike: boolean;
  };

  typicalDurationMin: 15 | 30 | 45 | 60;

  notifications: NotificationLevel;
}