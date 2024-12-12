import type {Filter, ITaskService} from './task.service.interfice';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import type {TaskModel} from '../model';
import type {TaskResponseDto} from '../dto/task-response.dto';
import {TaskModelFactory} from '../model/task.model.factory';
import {StatusName} from '../task.enum';
import moment from 'moment';

@Injectable({
  providedIn: "root"
})
class TaskService implements ITaskService {
  constructor(private http: HttpClient) { }

  list(): Observable<TaskModel[]>  {
    const dto = this.http.get<TaskResponseDto[]>(`http://localhost:3000/task`);

    return dto.pipe(map(tasks => tasks.map(task => TaskModelFactory.fromRequestDto(task))
      .sort((a, b) => {
        const dateA = moment(a.updatedAt);
        const dateB = moment(b.updatedAt);
        if (dateA.isAfter(dateB)) {
          return -1;
        }
        if (dateA.isAfter(dateB)) {
          return 1;
        }
        return 0;
      })
    ));
  }

  item(id: string): Observable<TaskModel>  {
    const dto = this.http.get<TaskResponseDto>(`http://localhost:3000/task/${id}`);

    return dto.pipe(map(task => TaskModelFactory.fromRequestDto(task)));
  }

  create(task: TaskModel): Observable<void>  {
    const updatedTask = TaskModelFactory.forRequestDto(task);
    updatedTask.status = StatusName.OPEN;

    return this.http.post<void>(`http://localhost:3000/task`, updatedTask);
  }

  edit(id: string, task: TaskModel): Observable<void> {
    const updatedTask = TaskModelFactory.forRequestDto(task);

    return this.http.put<void>(`http://localhost:3000/task/${id}`, updatedTask);
  }
}

export { TaskService };
