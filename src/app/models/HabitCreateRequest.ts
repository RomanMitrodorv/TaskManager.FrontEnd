import { Notification } from './Habit';

export interface HabitCreateRequest {
  name: string;
  periodicityId: number;
  notifications: Notification[];
  count: number;
}
