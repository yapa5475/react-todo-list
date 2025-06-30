import React from "react";
import { useTodos } from "../src/hooks/useTodos";

export function TestHookWrapper({ onReady }) {
  const todosState = useTodos();

  React.useEffect(() => {
    if (onReady) onReady(todosState);
  }, [onReady, todosState]);

  return null;
}