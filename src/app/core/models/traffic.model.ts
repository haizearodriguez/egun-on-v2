export interface TrafficRoot {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  incidences: TrafficIncidence[];
}

export interface TrafficIncidence {
  address: string;
  cameraId: string;
  cameraName: string;
  kilometer: string;
  latitude: string;
  longitude: string;
  road: string;
  sourceId: string;
  urlImage: string;
}
