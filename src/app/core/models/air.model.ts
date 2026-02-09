export interface AirQualityRoot {
  date: string;
  station: AirQualityStation[];
}

export interface AirQualityStation {
  id: string;
  name: string;
  airQualityStation: string;
  measurements: AirQualityMeasurement[];
}

export interface AirQualityMeasurement {
  name: string;
  value: number;
  unit: string;
  airquality?: string;
}
