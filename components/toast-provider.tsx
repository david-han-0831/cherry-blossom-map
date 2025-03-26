"use client"

import type React from "react"

import { useState } from "react"
import { ToastContext, Toaster } from "@/components/ui/toast"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<
    Array<{
      id: string
      title: string
      description?: string
      variant?: "default" | "destructive" | "success"
    }>
  >([])

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, dismiss }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

