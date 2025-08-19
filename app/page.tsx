"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GoogleMapsEmbed } from "./components/google-maps-embed"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLocked, setIsLocked] = useState(true)
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [pvEnabled, setPvEnabled] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [startY, setStartY] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    })
  }

  const handleUnlock = () => {
    setIsLocked(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return
    const currentY = e.touches[0].clientY
    const deltaY = startY - currentY
    if (deltaY > 40) {
      handleUnlock()
      setStartY(null)
    }
  }

  const handleTouchEnd = () => {
    setStartY(null)
  }

  const openApp = (appId: string) => {
    setActiveApp(appId)
  }

  const closeApp = () => {
    setActiveApp(null)
  }

  const notifications = [
    { title: "김준완 연차", desc: "8월18일 이사해야함" },
    { title: "구내 시당", desc: "이번주는 거르는게 답" },
    { title: "톡", desc: "[공지] 굿즈 예판 링크 안내" },
    { title: "News", desc: "티저 이미지 티징 (클릭 불가)" },
    { title: "BOM TV", desc: "PV 공개 D-3 · 홈에서 확인" },
    { title: "Calendar", desc: "4/23–26 POP-UP" },
    { title: "Notes", desc: '"home is where the heart is"' },
  ]

  const galleryImages = [
    "https://images.unsplash.com/photo-1520975922284-7b5168a6df4a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549880338659-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975922284-7b5168a6df4a?q=80&w=600&auto=format&fit=crop",
  ]

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#e5e7eb] font-sans overflow-hidden">
      <div className="stage min-h-screen grid place-items-center p-[clamp(12px,3vw,28px)] relative isolate">
        {/* Background with blur effect */}
        <div
          className="absolute inset-[-20px] bg-[url('/images/bg_image.png')] bg-center bg-top bg-no-repeat bg-[length:120%] blur-[8px] z-[-1]"
          style={{ filter: "blur(8px)" }}
        />

        {/* Share Button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="absolute bottom-[30px] left-[30px] w-12 h-12 bg-white/20 border border-white/10 rounded-full text-xl text-white cursor-pointer grid place-items-center z-10"
        >
          🔗
        </button>

        {/* Device Container */}
        <div className="transform scale-[0.8] drop-shadow-[0_26px_38px_rgba(0,0,0,0.45)] relative z-[1] mt-[5vh]">
          {/* iPhone Frame */}
          <div className="relative w-[390px] h-[844px] rounded-[56px] p-[18px] bg-gradient-to-b from-[#0f1115] to-[#151821] border-[10px] border-[#0e1117]">
            {/* Frame highlight effect */}
            <div
              className="absolute inset-[-10px] rounded-[64px] bg-gradient-to-br from-white/14 to-transparent opacity-85 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,0) 40%)",
                WebkitMask: "linear-gradient(#000,#000) content-box,linear-gradient(#000,#000)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "10px",
              }}
            />

            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[120px] h-9 bg-black rounded-[20px] z-[5] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

            {/* Screen */}
            <div className="relative h-full rounded-[38px] overflow-hidden bg-gradient-radial from-[#2a3a7a] via-[#2a3a7a] to-[#0b0f17] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              {/* Lock Screen */}
              {isLocked && (
                <section
                  className="absolute inset-0 text-white bg-[url('/images/lockscreen-bg.jpg')] bg-center bg-cover flex flex-col items-center cursor-pointer"
                  onClick={handleUnlock}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Clock */}
                  <div className="mt-[120px] text-[92px] font-light tracking-wide leading-[0.9] text-shadow-[0_6px_24px_rgba(0,0,0,0.45)]">
                    {formatTime(currentTime)}
                  </div>
                  <div className="mt-2 text-sm opacity-95 text-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    {formatDate(currentTime)}
                  </div>

                  {/* Notifications */}
                  <div className="absolute left-0 right-0 top-[280px] bottom-[80px] px-4">
                    <div className="h-full overflow-auto p-[2px_2px_10px] mask-image-[linear-gradient(transparent,#000_8%,#000_92%,transparent)]">
                      {notifications.map((notif, i) => (
                        <div
                          key={i}
                          className="bg-white/90 text-black rounded-2xl p-3 grid gap-0.5 shadow-[0_6px_18px_rgba(0,0,0,0.25)] m-[10px_6px]"
                        >
                          <div className="font-bold text-[13px]">{notif.title}</div>
                          <div className="text-xs text-gray-600">{notif.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-[18px] left-0 right-0 text-center text-xs opacity-90">
                    알림 외 영역 탭 또는 위로 스와이프 → 홈 화면
                  </div>
                </section>
              )}

              {/* Home Screen */}
              {!isLocked && (
                <section className="absolute inset-0 flex flex-col p-[64px_18px_24px] text-white bg-[url('/images/lockscreen-bg.jpg')] bg-center bg-cover">
                  {/* App Grid */}
                  <div className="grid grid-cols-4 gap-4 mt-3">
                    {/* Calendar */}
                    <button
                      onClick={() => openApp("cal")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-white to-gray-200 text-black">
                        📅
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Calendar</div>
                    </button>

                    {/* Photos */}
                    <button
                      onClick={() => openApp("gallery")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-blue-400 to-cyan-300">
                        🖼️
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Photos</div>
                    </button>

                    {/* Notes */}
                    <button
                      onClick={() => openApp("note")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-yellow-200 to-yellow-400 text-black">
                        📝
                        <span className="absolute -top-1 -right-1 bg-[#ff3b30] text-white font-extrabold h-5 min-w-5 px-1.5 grid place-items-center rounded-full text-[11px] shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                          1
                        </span>
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Notes</div>
                    </button>

                    {/* Web */}
                    <button
                      onClick={() => openApp("web")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-red-400 to-pink-500">
                        📰
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Web</div>
                    </button>

                    {/* Maps */}
                    <button
                      onClick={() => openApp("map")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-green-400 to-emerald-500">
                        🗺️
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Maps</div>
                    </button>

                    {/* BOM TV */}
                    <button
                      onClick={() => openApp("ott")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-indigo-500 to-blue-600">
                        📺
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">BOM TV</div>
                    </button>

                    {/* FaceTime */}
                    <button
                      onClick={() => openApp("ft")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-green-500 to-green-600">
                        📹
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">FaceTime</div>
                    </button>

                    {/* Settings */}
                    <button
                      onClick={() => openApp("settings")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-gray-400 to-gray-600">
                        ⚙️
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Settings</div>
                    </button>

                    {/* 봄톤 */}
                    <button
                      onClick={() => openApp("bom")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-pink-400 to-pink-600 font-bold">
                        B
                      </div>
                      <div className="text-[11px] text-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">봄톤</div>
                    </button>
                  </div>

                  {/* Dock */}
                  <div className="absolute left-[18px] right-[18px] bottom-[18px] p-3.5 rounded-[28px] bg-white/16 backdrop-blur-[10px] grid grid-cols-2 gap-3.5">
                    <button
                      onClick={() => openApp("phone")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-green-500 to-green-600">
                        📞
                      </div>
                    </button>
                    <button
                      onClick={() => openApp("msg")}
                      className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer text-white"
                    >
                      <div className="relative w-16 h-16 rounded-[18px] grid place-items-center text-[26px] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.28),0_6px_12px_rgba(0,0,0,0.25)] border border-white/8 bg-gradient-to-br from-green-500 to-green-600">
                        💬
                      </div>
                    </button>
                  </div>

                  {/* Search Pill */}
                  <div className="self-center mt-auto mb-[98px] px-3.5 py-2 rounded-full bg-white/18 backdrop-blur-[8px] text-xs text-gray-200">
                    ⌘ Search
                  </div>
                </section>
              )}

              {/* App Modals */}
              {activeApp && (
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center p-[18px] z-20">
                  <div className="w-[min(360px,92%)] max-h-[86%] bg-[#0a0f1a] rounded-[28px] overflow-hidden border border-white/8 flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    {/* App Bar */}
                    <div className="flex-shrink-0 flex items-center gap-2.5 p-3 bg-[#0e1422] border-b border-white/6">
                      <button
                        onClick={closeApp}
                        className="bg-none border-none text-gray-400 font-black cursor-pointer text-xl"
                      >
                        ✕
                      </button>
                      <div className="font-bold text-sm">
                        {activeApp === "cal" && "Calendar · 2025년 4월"}
                        {activeApp === "gallery" && "갤러리 · 보관함"}
                        {activeApp === "note" && "메모장 (힌트)"}
                        {activeApp === "web" && "Web · 구매/예약"}
                        {activeApp === "map" && "지도"}
                        {activeApp === "ott" && "BOM TV"}
                        {activeApp === "ft" && "FaceTime"}
                        {activeApp === "settings" && "Settings"}
                        {activeApp === "msg" && "톡 (읽기 전용)"}
                      </div>
                      <div className="flex-1" />
                    </div>

                    {/* App Body */}
                    <div className="flex-grow overflow-auto p-3.5">
                      {/* Calendar App */}
                      {activeApp === "cal" && (
                        <div className="grid gap-2.5">
                          <div className="flex justify-between items-center font-bold">
                            <span>April 2025</span>
                            <span>{formatTime(currentTime)}</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1.5">
                            {Array.from({ length: 35 }, (_, i) => {
                              const day = i - 1
                              const isSpecial = [20, 23, 24, 25, 26].includes(day)
                              const isRange = [23, 24, 25, 26].includes(day)
                              const isMarked = day === 20
                              return (
                                <div
                                  key={i}
                                  className={`
                                  bg-[#0d1424] border border-white/6 rounded-[10px] p-2 min-h-[42px] flex items-start justify-end text-xs text-slate-300 relative
                                  ${isMarked ? "outline outline-2 outline-amber-500 outline-offset-[-2px]" : ""}
                                  ${isRange ? "bg-gradient-to-t from-amber-500/35 to-amber-500/18" : ""}
                                `}
                                >
                                  {day > 0 && day <= 30 ? day : ""}
                                  {day === 26 && (
                                    <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-amber-500 text-black rounded-md px-1.5 py-0.5 font-extrabold text-[10px] text-center">
                                      POP-UP
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Gallery App */}
                      {activeApp === "gallery" && (
                        <div className="grid grid-cols-3 gap-1.5">
                          {galleryImages.map((src, i) => (
                            <img
                              key={i}
                              src={src || "/placeholder.svg"}
                              alt={`컷${i + 1}`}
                              className="w-full aspect-square object-cover rounded-[10px] cursor-pointer"
                              onClick={() => setLightboxImage(src)}
                            />
                          ))}
                        </div>
                      )}

                      {/* Notes App */}
                      {activeApp === "note" && (
                        <div className="p-3 rounded-xl bg-[#0d1424] border border-white/6">
                          <div className="font-bold">암호</div>
                          <div className="text-gray-400 text-xs mt-1">달력의 붉은 날을 이어서 읽어보세요.</div>
                        </div>
                      )}

                      {/* Web App */}
                      {activeApp === "web" && (
                        <div className="space-y-3">
                          <a
                            href="https://j-meeshop.com"
                            target="_blank"
                            className="block p-3 rounded-[14px] bg-[#0d1424] border border-white/6 text-gray-200 no-underline"
                            rel="noreferrer"
                          >
                            <div className="font-bold">굿즈 스토어 (재이미샵)</div>
                            <div className="text-gray-400 text-xs">새 탭으로 이동</div>
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            className="block p-3 rounded-[14px] bg-[#0d1424] border border-white/6 text-gray-200 no-underline"
                            rel="noreferrer"
                          >
                            <div className="font-bold">팝업 예약</div>
                            <div className="text-gray-400 text-xs">새 탭으로 이동</div>
                          </a>
                        </div>
                      )}

                      {/* Maps App */}
                      {activeApp === "map" && (
                        <div className="h-[300px] -m-3.5">
                          <GoogleMapsEmbed />
                        </div>
                      )}

                      {/* BOM TV App */}
                      {activeApp === "ott" && (
                        <div>
                          {!pvEnabled ? (
                            <div className="w-full aspect-video rounded-[14px] bg-[repeating-linear-gradient(0deg,#111_0,#111_2px,#1a1a1a_2px,#1a1a1a_4px)] grid place-items-center text-slate-300 font-extrabold tracking-wider">
                              準備中
                            </div>
                          ) : (
                            <iframe
                              className="w-full aspect-video rounded-[14px] border-none"
                              src="https://www.youtube-nocookie.com/embed/Q-6hVfCovKs"
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          )}
                          <div className="mt-2.5 text-xs text-gray-400">
                            PV 공개 전에는 노이즈 화면, 공개 후에는 영상으로 자동 전환(변수로 제어)
                          </div>
                        </div>
                      )}

                      {/* FaceTime App */}
                      {activeApp === "ft" && (
                        <div className="w-full aspect-video rounded-[14px] bg-gray-800 grid place-items-center text-slate-300">
                          셀카 형태의 PV 컷 삽입 영역
                        </div>
                      )}

                      {/* Settings App */}
                      {activeApp === "settings" && (
                        <div>
                          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d1424] border border-white/6 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={pvEnabled}
                              onChange={(e) => setPvEnabled(e.target.checked)}
                            />
                            <span>PV 공개됨 (체크 시 영상 표시)</span>
                          </label>
                        </div>
                      )}

                      {/* Messages App */}
                      {activeApp === "msg" && (
                        <div className="grid gap-2">
                          <div className="max-w-[80%] justify-self-start p-3 rounded-[18px] rounded-bl-[6px] bg-gray-800 text-gray-200">
                            [공지] 시즌그리팅 일정 공개! 04/01 티저, 04/23~26 POP-UP
                          </div>
                          <div className="max-w-[80%] justify-self-end p-3 rounded-[18px] rounded-br-[6px] bg-blue-600 text-white">
                            링크는 어디서 확인해요?
                          </div>
                          <div className="max-w-[80%] justify-self-start p-3 rounded-[18px] rounded-bl-[6px] bg-gray-800 text-gray-200">
                            웹(Web) 앱에서 이동 가능합니다.
                          </div>
                          <div className="rounded-xl bg-slate-900 p-2.5 border border-dashed border-gray-600 text-xs text-slate-400">
                            이미지/링크 첨부 미리보기 (상호작용 비활성)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[8px] z-[100] flex items-center justify-center">
          <div className="bg-gray-800 p-7 rounded-[20px] text-center relative border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <p className="m-0 mb-4 font-bold text-sm text-gray-200">이 페이지 공유하기</p>
            <button
              onClick={() => {
                const shareText =
                  "김빠지게 못하겠단 소리 하지마라 \n도전 하는게 중요 한거다\n호기롭게 시작한 만큼 끝까지 해보자"
                const shareUrl = window.location.href
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
                window.open(twitterUrl, "_blank", "width=600,height=400")
              }}
              className="bg-none border-none cursor-pointer"
              title="X(트위터)에 공유"
            >
              <svg
                className="w-[50px] h-[50px] fill-white transition-transform hover:scale-110"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-2 right-3 bg-none border-none text-gray-400 text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage || "/placeholder.svg"}
            alt="preview"
            className="max-w-[88vw] max-h-[88vh] rounded-xl"
          />
        </div>
      )}
    </div>
  )
}
