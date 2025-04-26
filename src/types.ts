import { ChartDataset } from "chart.js";

type FormEvent = React.FormEvent<HTMLFormElement>
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

type buttonEvent = React.MouseEvent<HTMLButtonElement>



export type { FormEvent, InputChangeEvent, buttonEvent };   

export interface CustomDataset extends ChartDataset<'line'> {
    weightListPerDay?: { [key: string]: number[] };
  }