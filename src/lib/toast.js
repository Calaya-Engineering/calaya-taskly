/**
 * Toast notifications via Sonner.
 * Use instead of alert() for consistent UX.
 */
import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message) => sonnerToast.success(message),
  error: (message) => sonnerToast.error(message),
  warning: (message) => sonnerToast.warning(message),
  info: (message) => sonnerToast.info(message),
  promise: (promise, data) => sonnerToast.promise(promise, data),
  loading: (message) => sonnerToast.loading(message),
  dismiss: (id) => sonnerToast.dismiss(id),
  /** Generic toast (default style) */
  message: (message) => sonnerToast(message),
};
