"use client";

import { useState } from "react";
import { AlertTriangle, Bell, Clock } from "lucide-react";
import {
  NOTIFICATION_TONES,
  type NotificationTone,
} from "@/constants/notification";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/utils/classNames";

const TONE_ICON = {
  [NOTIFICATION_TONES.OVERDUE]: AlertTriangle,
  [NOTIFICATION_TONES.DUE_SOON]: Clock,
} as const;

const TONE_CLASSES: Record<NotificationTone, string> = {
  [NOTIFICATION_TONES.OVERDUE]: "bg-rose-50 text-rose-500 dark:bg-rose-950/40",
  [NOTIFICATION_TONES.DUE_SOON]:
    "bg-amber-50 text-amber-500 dark:bg-amber-950/40",
};

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useNotifications();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notificações"
        aria-expanded={isOpen}
        className="relative rounded-xl bg-slate-100 p-2.5 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <Bell className="h-4 w-4" />
        {notifications.length > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <header className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm font-bold">Notificações</span>
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              {notifications.length}{" "}
              {notifications.length === 1 ? "nova" : "novas"}
            </span>
          </header>

          {notifications.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-400">
              Nenhuma notificação no momento.
            </p>
          ) : (
            <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
              {notifications.map((item) => {
                const Icon = TONE_ICON[item.tone];
                return (
                  <li key={item.id} className="flex gap-3 py-3 text-xs">
                    <div
                      className={cn(
                        "h-fit rounded-xl p-2",
                        TONE_CLASSES[item.tone],
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-slate-500">{item.message}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
