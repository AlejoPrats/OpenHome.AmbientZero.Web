import { ChartOption } from "../model/chart-option";

export const EMPTY_ECHARTS_OPTION: ChartOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: [] as string[] },
    xAxis: { type: 'time', boundaryGap: [0, 0], data: [] },
    yAxis: { type: 'value', min: 0, max: 30 },
    grid: {
      left: 0,
      right: 0,
      top: 20,
      bottom: 40,
      containLabel: false,
    },
    series: [{
      name: '',
      smooth: true,
      type: 'line',
      data: [] as (string | number)[][],
    }],
  };