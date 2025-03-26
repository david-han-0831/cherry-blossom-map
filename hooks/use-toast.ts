"use client"

import { useState } from "react"

type ToastType = "default" | "destructive" | "success"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastType
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string
    description?: string
    variant?: ToastType
  }) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, variant }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // 자동으로 3초 후에 토스트 제거
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 3000)

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return { toast, dismiss, toasts }
}

