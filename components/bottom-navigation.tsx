"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { List, Map } from "lucide-react"
import { motion } from "framer-motion"

export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const isMapActive = pathname === "/"
  const isListActive = pathname === "/list"

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E6E6E6] p-2 z-50">
      <motion.div
        className="container mx-auto max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="flex justify-around">
          <Button
            variant={isMapActive ? "default" : "ghost"}
            className={`flex-1 ${isMapActive ? "bg-[#FADADD] hover:bg-[#FFD1DC] text-[#333333]" : ""}`}
            onClick={() => router.push("/")}
          >
            <Map className="mr-2 h-4 w-4" />
            지도
          </Button>

          <Button
            variant={isListActive ? "default" : "ghost"}
            className={`flex-1 ${isListActive ? "bg-[#FADADD] hover:bg-[#FFD1DC] text-[#333333]" : ""}`}
            onClick={() => router.push("/list")}
          >
            <List className="mr-2 h-4 w-4" />
            목록
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

