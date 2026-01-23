export interface MeteoForecast {
  oid: string;
  numericId: number;
  entityVersion: number;
  at: string;
  for: string;
  region: Region;
  regionZone: RegionZone;
  regionZoneLocation: RegionZoneLocation;
  temperature: Temperature;
  temperatureRange: TemperatureRange;
  forecastText: ForecastText;
}

interface ForecastText {
  SPANISH: string;
  BASQUE: string;
}

interface TemperatureRange {
  min: number;
  max: number;
  unit: string;
}

interface Temperature {
  value: number;
  unit: string;
}

interface RegionZoneLocation {
  typeId: string;
  key: string;
  regionId: string;
  regionZoneId: string;
  regionZoneLocationId: string;
}

interface RegionZone {
  typeId: string;
  key: string;
  regionId: string;
  regionZoneId: string;
}

interface Region {
  typeId: string;
  key: string;
  regionId: string;
}