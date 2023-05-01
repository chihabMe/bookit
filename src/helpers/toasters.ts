import { toast, Toaster, ToastPosition } from "react-hot-toast";
export const toastSuccess = ({
  message,
  ...rest
}: {
  message: string;
  res?: ToastPosition;
}) =>
  toast.success(message, {
    duration: 1000,
    ...rest,
  });

export const toastError = ({
  message,
  ...rest
}: {
  message: string;
  res?: ToastPosition;
}) =>
  toast.error(message, {
    duration: 4000,
    ...rest,
  });
