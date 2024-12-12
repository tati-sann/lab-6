import {
  PriorityName,
  StatusName,
  TypeName
} from '../task.enum';

type TaskModel = {
  id: string;
  type: TypeName;
  priority: PriorityName;
  status: StatusName;
  assignee: string;
  creator: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type {TaskModel}
