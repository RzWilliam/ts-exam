enum Priority {
  Low,
  Medium,
  High,
}

enum Status {
  ToDo,
  InProgress,
  Done,
}

interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: Date;
}

export { Priority, Status };
export type { Task };
