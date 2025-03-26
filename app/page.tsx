import MapView from "@/components/map-view"
import WeatherWidget from "@/components/weather-widget"
import ShareButton from "@/components/share-button"

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-between items-start px-4 pt-4 pb-2 bg-white/80 backdrop-blur-sm">
        <WeatherWidget />
        <ShareButton />
      </div>
      <MapView />
    </div>
  )
}

