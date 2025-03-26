// 경로 포인트 타입
export type RoutePoint = {
  lat: number
  lng: number
  name?: string  // 경유지 이름 (선택적)
  description?: string  // 경유지 설명 (선택적)
}

// 기본 위치 타입
export type Location = {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  description: string
  image?: string
}

// 드라이브 코스의 포인트 타입
export type CoursePoint = {
  latitude: number
  longitude: number
  name?: string
  description?: string
  address?: string
  isMainPoint: boolean  // true면 마커 표시, false면 폴리라인 연결점으로만 사용
}

// 드라이브 코스 타입
export type DriveCourse = {
  id: string
  name: string
  description: string
  distance: string
  duration: string
  points: CoursePoint[]  // 모든 경로 포인트 (주요 지점 + 연결점)
}

// 전체 데이터 구조 타입
export type LocationData = {
  locations: Location[]
  driveCourses: DriveCourse[]
}

