export interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
}

export interface NewTaskData {
  title: Task['title'];
  summary: Task['summary'];
  date: Task['dueDate'];
}
