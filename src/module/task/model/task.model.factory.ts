import {TaskResponseDto} from '../dto/task-response.dto';
import {TaskModel} from './task.model';
import moment from 'moment';

abstract class TaskModelFactory {
  static fromRequestDto(dto: TaskResponseDto): TaskModel {
    return {
      assignee: dto.assignee,
      createdAt: moment(dto.createdAt, "YYYY-MM-DD HH:mm").toDate(),
      creator: dto.creator,
      description: dto.description,
      id: dto.id,
      priority: dto.priority,
      status: dto.status,
      title: dto.title,
      type: dto.type,
      updatedAt: moment(dto.updatedAt, "YYYY-MM-DD HH:mm").toDate()
    }
  }

  static forRequestDto(model: TaskModel): TaskResponseDto {
    return {
      assignee: model.assignee,
      createdAt: moment(model.createdAt ? model.createdAt : new Date()).format("YYYY-MM-DD HH:mm"),
      creator: model.creator,
      description: model.description,
      id: model.id,
      priority: model.priority,
      status: model.status,
      title: model.title,
      type: model.type,
      updatedAt: moment().format("YYYY-MM-DD HH:mm")
    }
  }
}

export { TaskModelFactory };
