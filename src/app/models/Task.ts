import { BaseDict } from './BaseDict';

export interface Task {
  id: number;
  name: string;
  notes: string;
  date: Date;
  labelId: number;
  completed: boolean;
  label: BaseDict;
  itemIndex: number;
}
