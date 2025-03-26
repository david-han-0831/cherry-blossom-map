"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { Location, CoursePoint } from "@/types/location"
import { locationData } from "@/data/location-data"
import LocationSkeleton from "@/components/location-skeleton"
import ScrollToTop from "@/components/scroll-to-top"
import LocationPopup from "@/components/location-popup"
import CherryBlossomEffect from "@/components/cherry-blossom-effect"
import WeatherWidget from "@/components/weather-widget"

export default function LocationList() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [burstEffect, setBurstEffect] = useState({ active: false, x: 0, y: 0 })

  // 드라이브 코스 포인트에 포함된 위치인지 확인하는 함수
  const isDriveCourseLocation = (location: Location) => {
    return locationData.driveCourses.some(course => 
      course.points.some(point => 
        point.latitude === location.latitude && 
        point.longitude === location.longitude &&
        point.isMainPoint
      )
    )
  }

  // 드라이브 코스의 주요 포인트들을 Location 타입으로 변환
  const getDriveCoursesLocations = () => {
    const driveLocations: Location[] = []
    locationData.driveCourses.forEach((course, courseIndex) => {
      course.points
        .filter(point => point.isMainPoint)
        .forEach((point, pointIndex) => {
          driveLocations.push({
            id: 1000 + (courseIndex * 100) + pointIndex, // 고유한 ID 생성
            name: point.name || course.name,
            address: point.description || course.description,
            latitude: point.latitude,
            longitude: point.longitude,
            description: course.description,
          })
        })
    })
    return driveLocations
  }

  // 모든 위치 데이터 (일반 위치 + 드라이브 코스 주요 포인트)
  const allLocations = [...locationData.locations, ...getDriveCoursesLocations()]

  useEffect(() => {
    // 간단한 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleLocationClick = (location: Location, e: React.MouseEvent) => {
    setBurstEffect({
      active: true,
      x: e.clientX,
      y: e.clientY
    })
    setTimeout(() => setBurstEffect({ active: false, x: 0, y: 0 }), 3000)
    setSelectedLocation(location)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-4 pb-24 relative">
      <CherryBlossomEffect 
        burst={burstEffect.active}
        burstX={burstEffect.x}
        burstY={burstEffect.y}
      />
      <div className="-mt-2 -mx-2 mb-3">
        <WeatherWidget />
      </div>
      <h1 className="text-xl font-bold font-noto text-[#FF6F91] mb-1">벚꽃 명소 목록</h1>
      <p className="text-sm text-gray-600 font-noto mb-6">
        광주의 아름다운 벚꽃 명소를 소개합니다.
      </p>

      <div className="grid gap-4 mb-4">
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => <LocationSkeleton key={`skeleton-${index}`} />)
        ) : (
          allLocations.map((location) => (
            <Card 
              key={location.id} 
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-white/90 backdrop-blur-sm border-[#FFE4E6]"
              onClick={(e) => handleLocationClick(location, e)}
            >
              <CardContent className="p-4">
                <div>
                  <h3 className="text-lg font-bold mb-1 font-noto text-[#333333]">{location.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 font-noto">{location.address}</p>
                  {isDriveCourseLocation(location) && (
                    <span className="inline-block bg-[#A3D9A5] text-white text-xs px-2 py-1 rounded-full">
                      드라이브 코스
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-sm">
            <LocationPopup 
              location={selectedLocation} 
              onClose={() => setSelectedLocation(null)} 
              isDriveCourseLocation={isDriveCourseLocation}
            />
          </div>
        </div>
      )}
      <ScrollToTop />
    </div>
  )
}

