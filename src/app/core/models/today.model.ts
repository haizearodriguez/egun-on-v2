export type TodayVM = {
  date: string;
  headline: { score: number; bestWindow: string; summary: string };
  badges: string[];
  recommendations: { type: 'walk' | 'run' | 'avoid'; text: string }[];
  windows: { label: string; score: number; status: 'best' | 'ok' | 'avoid' }[];
  explain: { components: { air: number; meteo: number; traffic: number; noise: number }; text: string };
  timeline: any[];
  forecast: any;
};
