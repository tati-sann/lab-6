import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TaskService} from '../../module/task/service/task.service';
import type {TaskModel} from '../../module/task/model';
import {NgForOf} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TaskCardComponent} from '../../components/task-card/task-card.component';
import moment from 'moment';
import {PriorityName, StatusName, TypeName} from '../../module/task/task.enum';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskItemComponent} from '../../components/task-item/task-item.component';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {UserModel} from '../../module/user/model';
import {UserService} from '../../module/user/service/user.service';
import {map, tap} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

type Filter = {
  type: TypeName,
  assignee: string,
  priority: PriorityName,
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    NgForOf,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    TaskCardComponent,
    CdkDrag,
    CdkDropList,
    TaskItemComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  filterForm: FormGroup;
  tasks: TaskModel[] = []
  openTasks: TaskModel[] = []
  todoTasks: TaskModel[] = []
  inProgressTasks: TaskModel[] = []
  completedTasks: TaskModel[] = []

  typeList: string[] = Object.values(TypeName);
  priorityList: string[] = Object.values(PriorityName);
  assigneeList: UserModel[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.filterForm = this.fb.group({
      priority: [''],
      type: [''],
      assignee: ['']
    })
  }
  ngOnInit() {
    this.loadList();

    this.userService.list().subscribe((users) => {
      this.assigneeList = users;
    })
  }

  private filterByStatus(tasks: TaskModel[], status: StatusName): TaskModel[] {
    return tasks.filter(task => task.status === status);
  }

  loadList() {
    this.taskService.list().pipe(
      map(tasks => ({
      task: tasks,
      openTasks: this.filterByStatus(tasks, StatusName.OPEN),
      todoTasks: this.filterByStatus(tasks, StatusName.TODO),
      inProgressTasks: this.filterByStatus(tasks, StatusName.ON_PROGRESS),
      completedTasks: this.filterByStatus(tasks, StatusName.DONE),
      }))
    ).subscribe(({ task, openTasks, todoTasks, inProgressTasks, completedTasks }) => {
      this.tasks = task;
      this.openTasks = openTasks;
      this.todoTasks = todoTasks;
      this.inProgressTasks = inProgressTasks;
      this.completedTasks = completedTasks;
    });
  }

  filter() {
    const filter: Filter = this.filterForm.value;
    const filteredTask = this.tasks.slice()
      .filter(task =>  {
        const matchesType = !filter.type || task.type === filter.type;
        const matchesAssignee = !filter.assignee || task.assignee === filter.assignee;
        const matchesPriority = !filter.priority || task.priority === filter.priority;

        return matchesType && matchesAssignee && matchesPriority;
      })

    this.openTasks = this.filterByStatus(filteredTask, StatusName.OPEN);
    this.todoTasks = this.filterByStatus(filteredTask, StatusName.TODO);
    this.inProgressTasks = this.filterByStatus(filteredTask, StatusName.ON_PROGRESS);
    this.completedTasks = this.filterByStatus(filteredTask, StatusName.DONE);
  }

  addTaskToBoard(task: TaskModel) {
    const updTask = {
      ...task,
      status: StatusName.TODO
    }

    this.taskService.edit(task.id, updTask).subscribe(() => this.loadList());
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer.id !== event.container.id) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const task = event.container.data.at(0);

      if (task) {
        switch (event.container.id) {
          case 'todo':
            task.status = StatusName.TODO;
            break;
          case 'progress':
            task.status = StatusName.ON_PROGRESS;
            break;
          case 'done':
            task.status = StatusName.DONE;
            break;
        }

        this.taskService.edit(task.id, task).subscribe(() => this.loadList())
      }
    }
  }

  protected readonly moment = moment;
}
