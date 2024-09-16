import { Injectable, inject, signal } from '@angular/core';
import { Task } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: Pick<Task, 'title' | 'description'>) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };

    this.tasks.update((prevTasks) => [...prevTasks, newTask]);
    this.loggingService.log(`ADDED TASK WITH TITLE : ${taskData.title}`);
  }

  updateTasksStatus(taskId: Task['id'], newStatus: Task['status']) {
    this.tasks.update((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === taskId
          ? { ...prevTask, status: newStatus }
          : { ...prevTask }
      )
    );
    this.loggingService.log(`CHANGE TASK STATUS TO : ${newStatus}`);
  }
}
