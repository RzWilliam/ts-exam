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

type CustomDate = {
  year: number;
  month: number;
  day: number;
  hour: string;
  minute: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: CustomDate;
}

export { Priority, Status };
export type { Task, CustomDate };
