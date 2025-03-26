"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, X } from "lucide-react"
import type { Location } from "@/types/location"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface LocationPopupProps {
  location: Location
  onClose: () => void
  isDriveCourseLocation: (location: Location) => boolean
}

export default function LocationPopup({ location, onClose, isDriveCourseLocation }: LocationPopupProps) {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    const el = document.createElement('input')
    el.style.cssText = 'position: fixed; top: -9999px; left: -9999px;'
    el.value = location.address
    document.body.appendChild(el)
    
    try {
      el.focus()
      el.select()
      const successful = document.execCommand('copy')
      if (successful) {
        setCopied(true)
        toast.success("주소가 복사되었습니다", {
          description: location.address,
        })
        setTimeout(() => setCopied(false), 2000)
      } else {
        toast.error("주소 복사 실패", {
          description: "주소를 복사하는데 실패했습니다.",
        })
      }
    } catch (err) {
      toast.error("주소 복사 실패", {
        description: "주소를 복사하는데 실패했습니다.",
      })
    } finally {
      document.body.removeChild(el)
    }
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
        onClick={onClose}
      />
      
      <motion.div
        className="absolute bottom-20 left-0 right-0 mx-auto p-4 z-20 max-w-sm"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <Card className="shadow-lg border-[#FADADD] bg-white">
          <CardHeader className="pb-2 relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 hover:bg-pink-50" 
              onClick={onClose}
            >
              <X className="h-5 w-5 text-gray-500 hover:text-[#FF6F91]" />
            </Button>
            <CardTitle className="text-lg font-noto pr-8">{location.name}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-2 font-noto">{location.address}</p>
            {location.description && <p className="text-sm mb-2 font-noto">{location.description}</p>}
            {isDriveCourseLocation(location) && (
              <span className="inline-block bg-[#A3D9A5] text-white text-xs px-2 py-1 rounded-full">드라이브 코스</span>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#FF6F91] hover:bg-[#FF407E]" onClick={copyAddress}>
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "복사됨" : "주소 복사하기"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  )
}

