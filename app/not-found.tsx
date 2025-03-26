import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="mb-4">
        <MapPin className="h-16 w-16 text-[#FF6F91] mx-auto" />
      </div>
      <h1 className="text-3xl font-bold mb-2 font-noto">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground mb-6 font-noto">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <Button asChild className="bg-[#FF6F91] hover:bg-[#FF407E]">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}

