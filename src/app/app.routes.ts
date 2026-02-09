import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'today',
        loadComponent: () => import('./pages/today/today.page').then((m) => m.TodayPage),
      },
      {
        path: 'social',
        loadComponent: () => import('./pages/social/social.page').then((m) => m.SocialPage),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then((m) => m.SettingsPage),
      },
      { path: '', redirectTo: 'today', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'social',
    loadComponent: () => import('./pages/social/social.page').then( m => m.SocialPage)
  },
];

