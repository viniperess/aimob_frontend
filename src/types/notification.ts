export interface NotificationType {
  id: number;
  taskId: number;
  task?: {
    id: number;
    description: string;
  };
}
