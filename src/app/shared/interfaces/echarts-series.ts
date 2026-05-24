export interface EchartsSeries {
  name: string;
  type: string;
  data: (string | number)[][];
  smooth: boolean;
}
