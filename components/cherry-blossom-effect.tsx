"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Petal {
  id: number
  x: number
  delay: number
  size: number
  rotation: number
  type: 'falling' | 'burst'
}

export default function CherryBlossomEffect({ burst = false, burstX = 0, burstY = 0 }) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const initialPetals: Petal[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 3,
      rotation: Math.random() * 360,
      type: 'falling' as const
    }))
    setPetals(initialPetals)
  }, [])

  useEffect(() => {
    if (burst) {
      const burstPetals: Petal[] = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: burstX,
        delay: Math.random() * 0.2,
        size: Math.random() * 4 + 3,
        rotation: Math.random() * 360,
        type: 'burst' as const
      }))
      setPetals(prev => [...prev, ...burstPetals])

      setTimeout(() => {
        setPetals(prev => prev.filter(petal => petal.type !== 'burst'))
      }, 3000)
    }
  }, [burst, burstX, burstY])

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute"
            initial={{ 
              x: petal.type === 'burst' ? burstX : petal.x,
              y: petal.type === 'burst' ? burstY : -20,
              rotate: petal.rotation,
              opacity: 0.8,
              scale: petal.type === 'burst' ? 0 : 1
            }}
            animate={{ 
              y: petal.type === 'burst' 
                ? burstY + (Math.random() - 0.5) * 300 // 퍼짐 범위 증가
                : window.innerHeight + 20,
              x: petal.type === 'burst'
                ? burstX + (Math.random() - 0.5) * 300 // 퍼짐 범위 증가
                : petal.x + Math.sin(petal.delay) * 150,
              rotate: petal.rotation + 720,
              opacity: petal.type === 'burst' ? [1, 0.8, 0] : [0.8, 0.6, 0.8],
              scale: petal.type === 'burst' ? [0, 1.2, 1] : 1
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: petal.type === 'burst' ? 2 : 8,
              delay: petal.delay,
              repeat: petal.type === 'burst' ? 0 : Infinity,
              ease: petal.type === 'burst' ? "easeOut" : "linear"
            }}
          >
            <div 
              className={`rounded-full blur-[1px] transform rotate-45 ${
                petal.type === 'burst' ? 'bg-[#FF6F91]' : 'bg-[#FFD1DC]'
              }`}
              style={{
                width: `${petal.size}px`,
                height: `${petal.size}px`,
                boxShadow: '0 0 3px rgba(255, 209, 220, 0.6)'
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 