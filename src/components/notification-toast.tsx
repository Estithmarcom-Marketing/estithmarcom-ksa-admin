import { useEffect, useRef, useState, useCallback } from "react";
import { MessageSquare, Wrench, Mail, Newspaper, X, Notebook } from "lucide-react";
import type { NotificationType } from "@/lib/types/notification";

type ToastItem = NotificationType & { toastId: string };

const notificationIcon: Record<NotificationType["type"], React.ReactNode> = {
  request_service: <Wrench size={15} />,
  request_residency: <Notebook size={15} />,
  contact_us:  <Mail size={15} />,
  subscription: <Newspaper size={15} />,
  chatbot_message: <MessageSquare size={15} />,
};

const TOAST_DURATION = 5000;

interface SingleToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const SingleToast = ({ toast, onDismiss }: SingleToastProps) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => onDismiss(toast.toastId), 320);
  }, [leaving, onDismiss, toast.toastId]);

  useEffect(() => {
    const enterFrame = requestAnimationFrame(() => setVisible(true));
    timerRef.current = setTimeout(dismiss, TOAST_DURATION);
    return () => {
      cancelAnimationFrame(enterFrame);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const transitionClasses = leaving
    ? "opacity-0 translate-x-8"
    : visible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-8";

  return (
    <div
      onClick={dismiss}
      className={`relative w-80 bg-white border border-zinc-200 rounded-xl p-3.5 flex gap-3 items-start overflow-hidden cursor-pointer shadow-sm transition-[opacity,transform] duration-300 ease-in-out ${transitionClasses}`}
    >
      <style>{`
        @keyframes toast-progress {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
        .toast-progress-bar {
          animation: toast-progress ${TOAST_DURATION}ms linear forwards;
          transform-origin: left;
        }
      `}</style>

      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-500">
        {notificationIcon[toast.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-xs font-medium text-zinc-900">
            {toast.title}
          </span>
          <span className="text-[10px] text-zinc-400">الآن</span>
        </div>
        <p className="text-[11.5px] text-zinc-500 leading-relaxed line-clamp-2 m-0">
          {toast.body}
        </p>
      </div>

      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        className="shrink-0 -mt-0.5 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center"
      >
        <X size={14} />
      </button>

      {/* Progress bar */}
      <div className="toast-progress-bar absolute bottom-0 left-0 h-0.5 w-full bg-zinc-200 rounded-b-xl" />
    </div>
  );
};

interface NotificationToastProps {
  notification: NotificationType | null;
}

const NotificationToast = ({ notification }: NotificationToastProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const seenRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!notification) return;
    if (seenRef.current.has(notification.id)) return;
    seenRef.current.add(notification.id);

    const item: ToastItem = {
      ...notification,
      toastId: `${notification.id}-${Date.now()}`,
    };

    setToasts((prev) => [...prev, item]);
  }, [notification]);

  const dismiss = useCallback((toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.toastId !== toastId));
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none">
      {toasts.map((t) => (
        <div key={t.toastId} className="pointer-events-auto">
          <SingleToast toast={t} onDismiss={dismiss} />
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
