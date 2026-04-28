"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
  loadingText?: React.ReactNode;
  spinnerClassName?: string;
};

export function LoadingButton({
  isLoading = false,
  loadingText,
  spinnerClassName,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <>
          <Loader2 className={["h-4 w-4 animate-spin", spinnerClassName || ""].join(" ").trim()} />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
