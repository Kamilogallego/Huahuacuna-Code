"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

type ChatNotificationBadgeProps = {
  childId?: string
  className?: string
}

export function ChatNotificationBadge({ childId, className }: ChatNotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulate checking for unread messages
    // In real implementation, this would connect to WebSocket or poll API
    const checkUnread = () => {
      // Mock: randomly set unread count
      const mockUnread = Math.random() < 0.3 ? Math.floor(Math.random() * 5) + 1 : 0
      setUnreadCount(mockUnread)
    }

    checkUnread()
    const interval = setInterval(checkUnread, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [childId])

  if (unreadCount === 0) return null

  return <Badge className={`bg-[#C33B2A] hover:bg-[#C33B2A]/90 ${className}`}>{unreadCount}</Badge>
}
