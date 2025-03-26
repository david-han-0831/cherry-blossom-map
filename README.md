# 광주시 벚꽃 지도 🌸

광주시의 아름다운 벚꽃 명소와 드라이브 코스를 소개하는 웹 애플리케이션입니다.

## 주요 기능

- 🗺️ 네이버 지도 기반의 벚꽃 명소 위치 표시
- 🚗 추천 드라이브 코스 안내
- 📱 반응형 디자인 (모바일 지원)
- 🌤️ 실시간 날씨 정보 제공
- 📋 주소 복사 및 공유 기능

## 기술 스택

- **Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Map**: Naver Maps API
- **Weather**: OpenWeather API
- **Deploy**: Vercel

## 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm

### 설치 방법

```bash
# 저장소 클론
git clone https://github.com/david-han-0831/cherry-blossom-map.git

# 디렉토리 이동
cd cherry-blossom-map

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```
NEXT_PUBLIC_NCP_CLIENT_ID=your_client_id
NEXT_PUBLIC_NCP_CLIENT_SECRET=your_client_cecret_id
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
```
