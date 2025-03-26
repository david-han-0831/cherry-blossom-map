"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import type { Location } from "@/types/location"
import LocationPopup from "./location-popup"
import { toast } from "sonner"
import WeatherWidget from "./weather-widget"
import CherryBlossomEffect from "./cherry-blossom-effect"
import { locationData } from '@/data/location-data'

declare global {
  interface Window {
    naver: any
  }
}

// RoutePoint 타입 추가
type RoutePoint = {
  lat: number
  lng: number
  name?: string
  description?: string
}

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [polylines, setPolylines] = useState<any[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [burstEffect, setBurstEffect] = useState({ active: false, x: 0, y: 0 })

  // 1. handleMarkerClick을 먼저 선언
  const handleMarkerClick = useCallback((location: Location, marker: any) => {
    const position = marker.getPosition()
    
    setBurstEffect({
      active: true,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    })
    
    setTimeout(() => setBurstEffect({ active: false, x: 0, y: 0 }), 3000)

    if (map) {
      map.setCenter(position)
      map.setZoom(13)
    }
    
    setSelectedLocation(location)
  }, [map])

  // 2. 지도 초기화와 마커, 폴리라인 생성을 분리
  useEffect(() => {
    if (!window.naver || !mapRef.current) return

    const mapOptions = {
      center: new window.naver.maps.LatLng(37.4995942, 127.3030256),
      zoom: 12
    }

    const newMap = new window.naver.maps.Map(mapRef.current, mapOptions)
    setMap(newMap)
  }, [])

  // 3. 마커와 폴리라인 생성을 별도 useEffect로 분리
  useEffect(() => {
    if (!map) return

    // 기존 마커와 폴리라인 제거
    markers.forEach(marker => marker.setMap(null))
    polylines.forEach(polyline => polyline.setMap(null))

    // 일반 장소 마커 생성
    const locationMarkers = locationData.locations.map(location => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(location.latitude, location.longitude),
        map,
        icon: {
          content: `
            <div class="cursor-pointer p-1.5 bg-white rounded-full shadow-lg border-2 border-[#FF6F91]">
              <div class="w-5 h-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6F91" class="w-4 h-4">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
                </svg>
              </div>
            </div>
          `,
          anchor: new window.naver.maps.Point(20, 20)
        }
      })

      window.naver.maps.Event.addListener(marker, 'click', () => handleMarkerClick(location, marker))
      return marker
    })

    // 모든 드라이브 코스에 대한 마커와 폴리라인 생성
    const allDriveMarkers: any[] = []
    const allPolylines: any[] = []

    locationData.driveCourses.forEach(driveCourse => {
      // 드라이브 코스의 마커 생성
      const driveMarkers = driveCourse.points
        .filter(point => point.isMainPoint)
        .map((point, index) => {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(point.latitude, point.longitude),
            map,
            icon: {
              content: `
                <div class="cursor-pointer p-1.5 bg-white rounded-full shadow-lg border-2 border-[#A3D9A5]">
                  <div class="w-6 h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#A3D9A5" class="w-5 h-5">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </div>
                </div>
              `,
              anchor: new window.naver.maps.Point(22, 22)
            }
          })

          if (point.name) {
            window.naver.maps.Event.addListener(marker, 'click', () => 
              handleMarkerClick({
                id: 10000 + index,
                name: point.name,
                address: point.address || `경기도 광주시 ${point.name}`,
                description: point.description || '',
                latitude: point.latitude,
                longitude: point.longitude
              } as Location, marker)
            )
          }

          return marker
        })

      // 드라이브 코스의 폴리라인 생성
      const path = driveCourse.points.map(point => 
        new window.naver.maps.LatLng(point.latitude, point.longitude)
      )
      
      const polyline = new window.naver.maps.Polyline({
        map,
        path,
        strokeColor: "#FF6F91",
        strokeWeight: 5,
        strokeOpacity: 0.8
      })

      allDriveMarkers.push(...driveMarkers)
      allPolylines.push(polyline)
    })

    // 상태 업데이트
    setMarkers([...locationMarkers, ...allDriveMarkers])
    setPolylines(allPolylines)

    return () => {
      locationMarkers.forEach(marker => marker.setMap(null))
      allDriveMarkers.forEach(marker => marker.setMap(null))
      allPolylines.forEach(polyline => polyline.setMap(null))
    }
  }, [map, handleMarkerClick])

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

  // 팝업 닫기 핸들러 수정
  const handleClosePopup = () => {
    setSelectedLocation(null)
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <CherryBlossomEffect 
        burst={burstEffect.active}
        burstX={burstEffect.x}
        burstY={burstEffect.y}
      />
      <div className="px-3 py-3 bg-white/90 backdrop-blur-sm border-b border-[#FFE4E6] relative z-10">
        <div className="max-w-screen-sm mx-auto w-full">
          <div className="-mt-2 -mx-2">
            <WeatherWidget />
          </div>
          <h1 className="text-xl font-bold font-noto text-[#FF6F91] mb-1">
            경기도 광주 벚꽃 명소
          </h1>
          <p className="text-sm text-gray-600 font-noto">
            광주의 아름다운 벚꽃 명소를 소개합니다. 드라이브 코스와 산책로를 확인해보세요.
          </p>
        </div>
      </div>

      <div className="flex-1 relative mx-3 mb-20">
        <div 
          ref={mapRef} 
          className="w-full h-full absolute inset-0 rounded-lg shadow-sm" 
        />
      </div>

      {selectedLocation && (
        <LocationPopup 
          location={selectedLocation} 
          onClose={handleClosePopup}
          isDriveCourseLocation={isDriveCourseLocation}
        />
      )}
    </div>
  )
}

