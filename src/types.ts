export interface LandRecord {
  id: string;
  documentType: string;
  documentNumber: string;
}

export interface FarmerRecord {
  uniqueId: string;
  fullName: string;
  phoneNumber: string;
  state: string;
  district: string;
  landRecords: LandRecord[];
  primaryCropType: string;
  sowingDate: string;
  tillageMethod: string;
  nitrogenRate: number;
  polygon?: any; // GeoJSON Polygon
  areaHectares?: number;
  areaAcres?: number;
  photos?: {
    corners: Record<string, string>;
    center?: string;
  };
}
