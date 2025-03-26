"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success"
  onClose?: () => void
}

export function Toast({ className, variant = "default", onClose, children, ...props }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
        variant === "default" && "bg-white border-[#FADADD]",
        variant === "destructive" && "bg-red-50 border-red-200 text-red-600",
        variant === "success" && "bg-green-50 border-green-200 text-green-600",
        className,
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </motion.div>
  )
}

export function ToastTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm font-semibold", className)} {...props} />
}

export function ToastDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm opacity-90", className)} {...props} />
}

export function Toaster() {
  const { toasts, dismiss } = React.useContext(ToastContext)

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-[420px] w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} variant={toast.variant} onClose={() => dismiss(toast.id)}>
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </Toast>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Context for managing toasts
interface ToastContextType {
  toasts: Array<{
    id: string
    title: string
    description?: string
    variant?: "default" | "destructive" | "success"
  }>
  dismiss: (id: string) => void
}

export const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  dismiss: () => {},
})

