export class DashboardDto {
  totalFarms: number;
  totalHectares: number;
  byState: { state: string; total: number }[];
  byCrop: { crop: string; total: number }[];
  landUse: {
    arableArea: number;
    vegetationArea: number;
  };
}
