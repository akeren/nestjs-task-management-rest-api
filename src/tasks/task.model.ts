export interface Task {
  id: string;
  title: string;
  describe: string;
  status: TaskStatus;
}

enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
