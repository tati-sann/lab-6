import {
  PriorityName,
  StatusName,
  TypeName
} from '../task.enum';

type TaskResponseDto = {
  id: string;
  type: TypeName;
  priority: PriorityName;
  status: StatusName;
  assignee: string;
  creator: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type {TaskResponseDto}
