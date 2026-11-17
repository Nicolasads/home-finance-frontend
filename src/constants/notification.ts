export const NOTIFICATION_TONES = {
  OVERDUE: "rose",
  DUE_SOON: "amber",
} as const;

export type NotificationTone =
  (typeof NOTIFICATION_TONES)[keyof typeof NOTIFICATION_TONES];
