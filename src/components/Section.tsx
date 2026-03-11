'use client'

import React, { ReactNode, RefObject } from 'react'

interface SectionProps {
  id: string
  refProp?: RefObject<HTMLDivElement | null>
  trigger?: boolean
  customLayout?: boolean
  leftContent?: ReactNode
  rightContent?: ReactNode
  height?: string
}

export default function Section({
  id,
  refProp,
  _trigger = true,
  customLayout = false,
  leftContent,
  rightContent,
  height,
}: SectionProps) {
  return (
    <section
      id={id}
      ref={refProp}
      className={`relative w-full ${height ?? 'min-h-screen'} overflow-hidden flex`}
    >
      {customLayout ? (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
          {leftContent}
          {rightContent}
        </div>
      ) : (
        <div className="flex flex-row w-full min-h-screen">
          <div className="w-[30%] bg-gray-800 text-white p-10">
            <h2 className="text-3xl font-bold mb-4 capitalize">{id}</h2>
            <p>This is the left side of the section.</p>
          </div>
          <div className="w-[70%] bg-white p-10">{/* right content here */}</div>
        </div>
      )}
    </section>
  )
}