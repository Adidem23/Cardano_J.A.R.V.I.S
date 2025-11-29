import * as React from "react";
import { cn } from "@/lib/utils";

export function PromptInput({
    children,
    value,
    onValueChange,
    onSubmit,
    isLoading,
    className,
}: {
    children: React.ReactNode;
    value: string;
    onValueChange: (v: string) => void;
    onSubmit: () => void;
    isLoading?: boolean;
    className?: string;
}) {
    return (
        <div
            data-value-length={value?.length}
            data-loading={isLoading ? "1" : "0"}
            data-has-onvalue={typeof onValueChange === "function" ? "1" : "0"}
            className={cn(
                "border rounded-xl p-3 bg-transparent flex flex-row items-center gap-3 prompt-input",
                className
            )}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit();
                }
            }}
        >
            {children}
        </div>
    );
}

export function PromptInputTextarea({
    placeholder,
    value,
    onChange,
    onKeyDown,
}: {
    placeholder?: string;
    value?: string;
    onChange?: (e: any) => void;
    onKeyDown?: (e: any) => void;
}) {
    return (

        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="w-full prompt-textarea border-transparent focus:border-transparent focus:ring-0 outline-none"
            rows={2}
        />

    );
}

export function PromptInputActions({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("flex gap-2 pt-2 prompt-controls", className)}>{children}</div>;
}

export function PromptInputAction({
    children,
    tooltip,
}: {
    children: React.ReactNode;
    tooltip?: string;
}) {
    return (
        <div title={tooltip} className="flex items-center">
            {children}
        </div>
    );
}
