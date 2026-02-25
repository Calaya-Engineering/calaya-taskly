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
  /** Generic toast (default style) */
  message: (message) => sonnerToast(message),
};
