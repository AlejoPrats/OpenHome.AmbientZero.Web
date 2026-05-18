import { EchartsLineStyle } from "./echarts-line-style";

export interface EchartsSeries {
    name:string,
    type:string,
    data:(string | number)[][],
    smooth:boolean
}
