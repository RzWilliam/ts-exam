export enum Priority {
  Low,
  Medium,
  High,
}

export enum Status {
  ToDo,
  InProgress,
  Done,
}

export type CustomDate = {
  year: number;
  month: number;
  day: number;
  hour: string;
  minute: string;
};

export const customDateToISOString = (date: CustomDate): string => {
  const year = date.year.toString().padStart(4, '0');
  const month = (date.month + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.day.toString().padStart(2, '0');
  const hour = date.hour;
  const minute = date.minute;

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: CustomDate;
};