import { NotificationTone } from "@/constants/notification";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  tone: NotificationTone;
  createdAt: string;
}
