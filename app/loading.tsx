import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6F91]" />
        <p className="text-sm text-muted-foreground font-noto">로딩 중...</p>
      </div>
    </div>
  )
}

