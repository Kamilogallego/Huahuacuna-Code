"use client"

import * as React from "react"

import { useState, useEffect, useRef } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Send, Check, CheckCheck, Bell, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

type Message = {
  id: string
  senderId: string
  senderName: string
  senderRole: "sponsor" | "admin"
  text: string
  timestamp: string
  read: boolean
}

type ChatSettings = {
  soundEnabled: boolean
  desktopNotifications: boolean
  emailNotifications: boolean
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    senderId: "admin1",
    senderName: "María González",
    senderRole: "admin",
    text: "¡Hola! Bienvenido al chat de Sofía. Estoy aquí para responder cualquier pregunta sobre su progreso.",
    timestamp: "2024-03-10T10:00:00",
    read: true,
  },
  {
    id: "2",
    senderId: "sponsor1",
    senderName: "Juan Pérez",
    senderRole: "sponsor",
    text: "Muchas gracias. Me gustaría saber cómo va Sofía en la escuela.",
    timestamp: "2024-03-10T10:15:00",
    read: true,
  },
  {
    id: "3",
    senderId: "admin1",
    senderName: "María González",
    senderRole: "admin",
    text: "¡Sofía está excelente! Acaba de ganar el primer lugar en el concurso de dibujo escolar. Su profesora está muy orgullosa de ella.",
    timestamp: "2024-03-10T10:20:00",
    read: true,
  },
  {
    id: "4",
    senderId: "sponsor1",
    senderName: "Juan Pérez",
    senderRole: "sponsor",
    text: "¡Qué maravillosa noticia! Me alegra mucho saber que está desarrollando su talento artístico.",
    timestamp: "2024-03-10T10:25:00",
    read: true,
  },
  {
    id: "5",
    senderId: "admin1",
    senderName: "María González",
    senderRole: "admin",
    text: "Sí, es una niña muy talentosa. Su obra será exhibida en la biblioteca municipal el próximo mes. Le enviaremos fotos del evento.",
    timestamp: "2024-03-10T10:30:00",
    read: false,
  },
]

export default function ChatPage({ params }: { params: { childId: string } }) {
  // Next.js 16: params es una Promise en componentes cliente, se debe envolver con React.use
  const { childId } = React.use(params)

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [settings, setSettings] = useState<ChatSettings>({
    soundEnabled: true,
    desktopNotifications: false,
    emailNotifications: true,
  })
  const [unreadCount, setUnreadCount] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUserId = "sponsor1" // In real app, this would come from auth context

  useEffect(() => {
    // Count unread messages
    const unread = messages.filter((msg) => !msg.read && msg.senderId !== currentUserId).length
    setUnreadCount(unread)

    // Mark messages as read when viewing
    const timer = setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          read: true,
        })),
      )
      setUnreadCount(0)
    }, 1000)

    return () => clearTimeout(timer)
  }, [messages, currentUserId])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Simulate receiving new messages (WebSocket in real implementation)
    const interval = setInterval(() => {
      // Randomly receive a message (10% chance every 10 seconds)
      if (Math.random() < 0.1) {
        const newMsg: Message = {
          id: String(Date.now()),
          senderId: "admin1",
          senderName: "María González",
          senderRole: "admin",
          text: "Hola, ¿hay algo más en lo que pueda ayudarte?",
          timestamp: new Date().toISOString(),
          read: false,
        }
        setMessages((prev) => [...prev, newMsg])

        // Play sound if enabled
        if (settings.soundEnabled) {
          console.log("[v0] Playing notification sound")
          // In real app: new Audio('/notification.mp3').play()
        }

        // Show desktop notification if enabled
        if (settings.desktopNotifications && "Notification" in window && Notification.permission === "granted") {
          console.log("[v0] Showing desktop notification")
          // In real app: new Notification('Nuevo mensaje', { body: newMsg.text })
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [settings])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: String(Date.now()),
      senderId: currentUserId,
      senderName: "Juan Pérez",
      senderRole: "sponsor",
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate message encryption before sending
    console.log("[v0] Encrypting and sending message:", message.text)
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      const permission = await Notification.requestPermission()
      console.log("[v0] Notification permission:", permission)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString("es-CO", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <Button variant="ghost" asChild className="mb-6 text-[#1C4E9A] hover:text-[#1C4E9A]/80">
          <Link href={`/mis-apadrinamientos/${childId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Perfil
          </Link>
        </Button>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <Card className="lg:col-span-3 flex flex-col h-[calc(100vh-16rem)]">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Chat sobre Sofía</CardTitle>
                  <CardDescription>Comunicación con administradores</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Badge className="bg-[#C33B2A] hover:bg-[#C33B2A]/90">{unreadCount} nuevos</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-[#1C4E9A]"
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.senderId === currentUserId

                return (
                  <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[70%] ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={isOwnMessage ? "/placeholder.svg" : "/placeholder.svg"} />
                        <AvatarFallback
                          className={isOwnMessage ? "bg-[#1C4E9A] text-white" : "bg-[#5CA244] text-white"}
                        >
                          {message.senderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-muted-foreground">{message.senderName}</span>
                          {message.senderRole === "admin" && (
                            <Badge variant="secondary" className="text-xs bg-[#5CA244]/20 text-[#5CA244]">
                              Admin
                            </Badge>
                          )}
                        </div>

                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            isOwnMessage
                              ? "bg-[#1C4E9A] text-white rounded-tr-sm"
                              : "bg-muted text-foreground rounded-tl-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>

                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                          {isOwnMessage && (
                            <span className="text-xs">
                              {message.read ? (
                                <CheckCheck className="h-3 w-3 text-[#5CA244]" />
                              ) : (
                                <Check className="h-3 w-3 text-muted-foreground" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1"
                />
                <Button type="submit" className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>

          {/* Settings Sidebar */}
          <Card className={`lg:col-span-1 ${showSettings ? "block" : "hidden lg:block"}`}>
            <CardHeader>
              <CardTitle className="text-lg font-heading text-[#1C4E9A]">Configuración</CardTitle>
              <CardDescription>Notificaciones del chat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {settings.soundEnabled ? (
                      <Volume2 className="h-4 w-4 text-[#1C4E9A]" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Label htmlFor="sound" className="text-sm font-heading cursor-pointer">
                      Sonido
                    </Label>
                  </div>
                  <Switch
                    id="sound"
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, soundEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-[#1C4E9A]" />
                    <Label htmlFor="desktop" className="text-sm font-heading cursor-pointer">
                      Escritorio
                    </Label>
                  </div>
                  <Switch
                    id="desktop"
                    checked={settings.desktopNotifications}
                    onCheckedChange={(checked) => {
                      setSettings((prev) => ({ ...prev, desktopNotifications: checked }))
                      if (checked) requestNotificationPermission()
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-[#1C4E9A]" />
                    <Label htmlFor="email" className="text-sm font-heading cursor-pointer">
                      Email (24h)
                    </Label>
                  </div>
                  <Switch
                    id="email"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
              </div>

              <Alert className="bg-[#F6C344]/10 border-[#F6C344]">
                <Bell className="h-4 w-4 text-[#1C4E9A]" />
                <AlertDescription className="text-xs text-foreground">
                  Si un mensaje no es leído en 24 horas y tienes el email activado, recibirás una notificación por
                  correo.
                </AlertDescription>
              </Alert>

              <div className="pt-4 border-t space-y-3">
                <h4 className="text-sm font-heading font-semibold text-[#1C4E9A]">Información</h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>
                    <strong>Seguridad:</strong> Todos los mensajes están encriptados de extremo a extremo.
                  </p>
                  <p>
                    <strong>Privacidad:</strong> Solo tú y los administradores pueden ver esta conversación.
                  </p>
                  <p>
                    <strong>Historial:</strong> El historial de mensajes se guarda de forma permanente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
