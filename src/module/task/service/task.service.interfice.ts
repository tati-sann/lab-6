import { Observable } from 'rxjs';
import {TaskModel} from '../model';
import {PriorityName, TypeName} from '../task.enum';

type Filter = {
  type: TypeName | null,
  priority: PriorityName | null,
  assignee: string | null,
}
interface ITaskService {
  list(): Observable<TaskModel[]>;
  item(id: string): Observable<TaskModel | null>;
  create(task: TaskModel): Observable<void>;
  edit(id: string, task: TaskModel): Observable<void>;
}

export type { ITaskService, Filter };
