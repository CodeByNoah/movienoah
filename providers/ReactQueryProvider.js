"use client";
import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function ReactQueryProvider({ children }) {
  const clientRef = useRef();

  if (!clientRef.current) {
    clientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
