"use client";

import { useCallback, useState } from "react";

type AsyncActionOptions = {
  onError?: (error: unknown) => void;
  onFinally?: () => void;
};

export function useAsyncAction() {
  const [isPending, setIsPending] = useState(false);

  const run = useCallback(
    async <T>(fn: () => Promise<T>, options?: AsyncActionOptions): Promise<T | undefined> => {
      if (isPending) return undefined;
      setIsPending(true);
      try {
        return await fn();
      } catch (error) {
        options?.onError?.(error);
        return undefined;
      } finally {
        setIsPending(false);
        options?.onFinally?.();
      }
    },
    [isPending]
  );

  return { isPending, run };
}
