export interface EchartsSeries {
  name: string;
  color: string | null;
  type: string;
  data: (string | number)[][];
  smooth: boolean;
}
