"use client";
import React from 'react'

const Loading = () => {
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#0000007a] w-[100%] h-[100%] grid place-items-center">
        <div className="lds-dual-ring"></div>
    </div>
  )
}

export default Loading