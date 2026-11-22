export type ChartOption = {
  tooltip: { trigger: string };
  legend: { data: string[]; type: 'plain' | 'scroll'; bottom: number };
  xAxis: { type: string; boundaryGap: number[]; data: string[] };
  yAxis: { type: string; min: number; max: number };
  grid: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    containLabel: boolean; // disables label padding
  };
  series: {
    name: string;
    smooth: boolean;
    type: string;
    data: (string | number)[][];
  }[];
};
