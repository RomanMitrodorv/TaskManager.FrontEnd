import { BaseDict } from "./BaseDict";

export interface TaskWithStatus {
    status: BaseDict;
    tasks: Task[];
}
