"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"
import { toast } from "sonner"

export default function ShareButton() {
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "벚꽃 명소 지도",
          text: "경기도 광주 벚꽃 명소 지도를 확인해보세요!",
          url: window.location.href,
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href)
        toast.success("링크가 복사되었습니다", {
          description: "친구들에게 공유해보세요!",
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch (error) {
      console.error("공유하기 실패:", error)
      toast.error("공유하기 실패", {
        description: "다시 시도해주세요.",
      })
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-white/90 backdrop-blur-sm shadow-sm border-[#FFF8E1] hover:bg-white"
      onClick={handleShare}
    >
      {shared ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
    </Button>
  )
}

