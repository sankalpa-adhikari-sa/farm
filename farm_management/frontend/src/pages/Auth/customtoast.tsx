import { toast } from "sonner";
import { X } from "lucide-react";
interface CustomToastContentProps {
  title: string;
  description?: string;
  variant?: "destructive" | "success" | "warning" | "default";
  t?: string | number;
}

function CustomToastContent({
  title,
  description,
  t,
  variant = "default",
}: CustomToastContentProps) {
  const getVariantStyles = (): {
    background: string;
  } => {
    switch (variant) {
      case "destructive":
        return {
          background:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
        };

      case "success":
        return {
          background: "bg-success text-success-foreground hover:bg-success/90 ",
        };
      case "warning":
        return {
          background: "bg-warning text-warning-foreground hover:bg-warning/90 ",
        };
      default:
        return {
          background: "border bg-background text-foreground",
        };
    }
  };

  const { background } = getVariantStyles();
  return (
    <div
      //   className={`group pointer-events-auto relative flex flex-col w-full space-x-4 space-y-2 justify-between overflow-hidden rounded-md border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full ${background}`}
      className={`group pointer-events-auto relative flex flex-col  space-x-4 space-y-2 overflow-hidden rounded-md border p-4 pr-20 shadow-lg  ${background}`}
    >
      <X
        onClick={() => toast.dismiss(t)}
        className="absolute right-2 top-2  rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
      />
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-sm opacity-90">{description}</span>
    </div>
  );
}

export function CustomToast({
  title,
  description,
  variant,
}: CustomToastContentProps): void {
  toast.custom((t) => (
    <CustomToastContent
      t={t}
      title={title}
      description={description}
      variant={variant}
    />
  ));
}
