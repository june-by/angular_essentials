import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { TaskComponent } from './task/task.component';

import { TasksService } from './tasks.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../users/users.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();
  userTasks = input.required<Task[]>();
  // private tasksService = inject(TasksService);

  // userTasks = computed(() =>
  //   this.tasksService
  //     .allTasks()
  //     .filter((task) => task.userId === this.userId())
  //     .sort((a, b) => {
  //       if (this.order() === 'desc') {
  //         return a.id > b.id ? -1 : 1;
  //       } else {
  //         return a.id > b.id ? 1 : -1;
  //       }
  //     })
  // );

  // private activatedRoute = inject(ActivatedRoute);
  // private destoryRef = inject(DestroyRef);
  ngOnInit(): void {
    // const subscription = this.activatedRoute.queryParams.subscribe({
    //   next : params => { this.order = params['order']}
    // })
    // this.destoryRef.onDestroy(() => subscription.unsubscribe())
  }
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);

  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    )
    .sort((a, b) => {
      if (order && order === 'asc') {
        return a.id > b.id ? 1 : -1;
      } else {
        return a.id > b.id ? -1 : 1;
      }
    });

  return tasks;
};
