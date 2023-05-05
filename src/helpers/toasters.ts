import { toast, Toaster, ToastOptions } from "react-hot-toast";
export const toastSuccess = ({
  message,
  ...rest
}: {
  message: string;
  rest?: ToastOptions;
}) =>
  toast.success(message, {
    ...rest,
  });
export const toastError = ({
  message,
  ...rest
}: {
  message: string;
  res?: ToastOptions;
}) =>
  toast.error(message, {
    duration: 4000,
    ...rest,
  });
