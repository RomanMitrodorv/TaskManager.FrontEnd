export interface Habit {
  id: number;
  dateCreation: Date;
  name: string;
  periodicityId: number;
  periodicity: Periodicity;
  notifications: Notification[];
  isShow: boolean;
  count: number;
  completedCount: number;
}

export interface Periodicity {
  code: Date;
  name: string;
}

export interface Notification {
  time: string;
}
