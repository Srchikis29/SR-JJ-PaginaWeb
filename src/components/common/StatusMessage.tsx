import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

type StatusMessageVariant = "loading" | "error" | "empty" | "success";

interface StatusMessageProps {
    variant: StatusMessageVariant;
    title: string;
    description?: string;
    action?: ReactNode;
}

const variantIcons = {
    loading: LoaderCircle,
    error: AlertCircle,
    empty: AlertCircle,
    success: CheckCircle2,
};

function StatusMessage({ variant, title, description, action }: StatusMessageProps) {
    const Icon = variantIcons[variant];
    const iconClassName = variant === "error" ? "text-brand-wine" : variant === "success" ? "text-brand-teal" : "text-brand-cognac";

    return (
        <div className="retro-panel border border-brand-gold/40 px-6 py-14 text-center" role={variant === "error" ? "alert" : "status"}>
            <Icon className={`mx-auto ${iconClassName} ${variant === "loading" ? "animate-spin" : ""}`} size={28} aria-hidden="true" />
            <h2 className="theme-heading mt-4 font-display text-4xl tracking-[0.03em]">{title}</h2>
            {description && <p className="theme-muted mx-auto mt-2 max-w-md text-sm leading-6">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

export default StatusMessage;