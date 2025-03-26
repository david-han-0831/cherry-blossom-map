"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Cloud, CloudRain } from "lucide-react"
import { motion } from "framer-motion"

interface WeatherData {
  temp: number
  description: string
  icon: string
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 광주시 중앙공원 좌표 기준
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=37.4292&lon=127.2552&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric&lang=kr`
        )
        const data = await response.json()
        
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon
        })
      } catch (error) {
        console.error("날씨 정보 가져오기 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (icon: string) => {
    if (icon.includes('01') || icon.includes('02')) return <Sun className="h-6 w-6 text-yellow-500" />
    if (icon.includes('03') || icon.includes('04')) return <Cloud className="h-6 w-6 text-gray-500" />
    return <CloudRain className="h-6 w-6 text-blue-500" />
  }

  if (loading) return null

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20 }}
      className="mb-3"
    >
      <Card className="bg-white/90 backdrop-blur-sm shadow-sm border-[#FFF8E1]">
        <CardContent className="p-3">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              {weather && getWeatherIcon(weather.icon)}
              <span className="font-medium font-noto text-sm">경기도 광주</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-noto text-gray-600">{weather?.description}</span>
              <span className="text-base font-bold">{weather?.temp}°C</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

