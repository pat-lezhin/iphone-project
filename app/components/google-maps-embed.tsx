"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function GoogleMapsEmbed() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyAxlcBbyxBP7TttzXGzoSIdbLFQ_5u6qtk"}&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = initializeMap
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }

    const initializeMap = () => {
      if (!mapRef.current) return

      const position = { lat: 37.5665, lng: 126.978 } // Seoul City Hall

      if (mapInstanceRef.current) {
        window.google.maps.event.trigger(mapInstanceRef.current, "resize")
        mapInstanceRef.current.setCenter(position)
        return
      }

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: position,
      })

      new window.google.maps.Marker({
        map: map,
        position: position,
        title: "Seoul City Hall",
      })

      mapInstanceRef.current = map
    }

    loadGoogleMaps()
  }, [])

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "300px",
      }}
    />
  )
}
