import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../../module/task/service/task.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {UserService} from '../../module/user/service/user.service';
import {UserModel} from '../../module/user/model';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {PriorityName, TypeName} from '../../module/task/task.enum';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import moment from 'moment';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    NgForOf,
    MatLabel,
    MatCard,
    MatCardContent,
    MatButton,
    MatList,
    MatListItem,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  id: string | null = null;
  taskForm: FormGroup;
  users: UserModel[] = [];
  typeList: string[] = Object.values(TypeName);
  priorityList: string[] = Object.values(PriorityName);
  taskDate: {
    created: string,
    updated: string,
  } | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.taskForm = this.fb.group({
      type: ['', Validators.required],
      priority: ['', Validators.required],
      assignee: ['', Validators.required],
      creator: ['', Validators.required],
      status: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.userService.list().subscribe((users) => {
      this.users = users;
    })

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? null;

      if (this.id) {
        this.taskService.item(this.id).subscribe((task) => {
          this.taskForm.patchValue(task);
          this.taskDate = {
            created: moment(task.createdAt).format("DD.MM.YYYY HH:mm"),
            updated: moment(task.updatedAt).format("DD.MM.YYYY HH:mm")
          };
        })
      }
    })
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const request$ = !!this.id?.length ?
        this.taskService.edit(this.id, this.taskForm.value) :
        this.taskService.create(this.taskForm.value);

      request$.subscribe(() => {
        this.router.navigate([`/`]);
      }, error => {
        console.error(error);
      });
    }
  }
}
