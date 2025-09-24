"use client";

import { useEffect } from "react";

export function useSSE<T>(url: string, onMessage: (data: T) => void) {
  useEffect(() => {
    const evtSource = new EventSource(url);

    evtSource.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data);
        onMessage(parsed);
      } catch (err) {
        console.error("Failed to parse SSE:", err);
      }
    };

    evtSource.onerror = (err) => {
      console.error("SSE error:", err);
      evtSource.close();
    };

    return () => {
      evtSource.close();
    };
  }, [url, onMessage]);
}
