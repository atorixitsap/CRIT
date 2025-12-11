import React from "react"

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`flex flex-col items-center gap-4 p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h3 className={`text-2xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-6 pt-0 text-lg ${className}`} {...props}>
      {children}
    </div>
  )
} 