// Borrowed from shadcn/ui: https://ui.shadcn.com/docs/components/toast
import { 
  ToastActionElement, 
  type ToastProps as ToastPrimitiveProps 
} from "@/components/ui/toast";
import {
  toast,
  useToast as useToastOriginal
} from "@/components/ui/use-toast";

type ToastProps = ToastPrimitiveProps & {
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

export function useToast() {
  const { toast: originalToast, dismiss } = useToastOriginal();

  return {
    toast: (props: ToastProps) => {
      return originalToast(props);
    },
    dismiss,
  };
}