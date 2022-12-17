export interface TaskRequest {
  name: string;
  notes: string;
  date: string | null;
  labelId: number;
  id?: number;
}
