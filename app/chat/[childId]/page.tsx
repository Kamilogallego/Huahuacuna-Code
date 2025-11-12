use client

import type React from "react"
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
  const currentUserId = "sponsor1"

  useEffect(() => {
    const unread = messages.filter((msg) => !msg.read && msg.senderId !== currentUserId).length
    setUnreadCount(unread)

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const interval = setInterval(() => {
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

        if (settings.soundEnabled) {
          console.log("[v0] Playing notification sound")
        }
        if (settings.desktopNotifications && "Notification" in window && Notification.permission === "granted") {
          console.log("[v0] Showing desktop notification")
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
          <Link href={`/mis-apadrinamientos/${params.childId}`}>\n            <ArrowLeft className="mr-2 h-4 w-4" />\n            Volver al Perfil\n          </Link>
        </Button>

        <div className="grid lg:grid-cols-4 gap-6">
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

            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.senderId === currentUserId
                return (
                  <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>\n                    <div className={`flex gap-3 max-w-[70%] ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>\n                      <Avatar className="h-10 w-10 flex-shrink-0">\n                        <AvatarImage src="/placeholder.svg" />\n                        <AvatarFallback\n                          className={isOwnMessage ? "bg-[#1C4E9A] text-white" : "bg-[#5CA244] text-white"}\n                        >\n                          {message.senderName\n                            .split(" ")\n                            .map((n) => n[0])\n                            .join("")}\n                        </AvatarFallback>\n                      </Avatar>\n\n                      <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>\n                        <div className="flex items-center gap-2 mb-1">\n                          <span className="text-xs font-semibold text-muted-foreground">{message.senderName}</span>\n                          {message.senderRole === "admin" && (\n                            <Badge variant="secondary" className="text-xs bg-[#5CA244]/20 text-[#5CA244]">\n                              Admin\n                            </Badge>\n                          )}\n                        </div>\n\n                        <div\n                          className={`rounded-2xl px-4 py-3 ${\n                            isOwnMessage\n                              ? "bg-[#1C4E9A] text-white rounded-tr-sm"\n                              : "bg-muted text-foreground rounded-tl-sm"\n                          }`}\n                        >\n                          <p className="text-sm leading-relaxed">{message.text}</p>\n                        </div>\n\n                        <div className="flex items-center gap-1 mt-1">\n                          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>\n                          {isOwnMessage && (\n                            <span className="text-xs">\n                              {message.read ? (\n                                <CheckCheck className="h-3 w-3 text-[#5CA244]" />\n                              ) : (\n                                <Check className="h-3 w-3 text-muted-foreground" />\n                              )}\n                            </span>\n                          )}\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                )\n              })}\n              <div ref={messagesEndRef} />\n            </CardContent>\n\n            <div className="border-t p-4">\n              <form onSubmit={handleSendMessage} className="flex gap-2">\n                <Input\n                  value={newMessage}\n                  onChange={(e) => setNewMessage(e.target.value)}\n                  placeholder="Escribe tu mensaje..."\n                  className="flex-1"\n                />\n                <Button type="submit" className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">\n                  <Send className="h-4 w-4" />\n                </Button>\n              </form>\n            </div>\n          </Card>\n\n          <Card className={`lg:col-span-1 ${showSettings ? "block" : "hidden lg:block"}`}>\n            <CardHeader>\n              <CardTitle className="text-lg font-heading text-[#1C4E9A]">Configuración</CardTitle>\n              <CardDescription>Notificaciones del chat</CardDescription>\n            </CardHeader>\n            <CardContent className="space-y-6">\n              <div className="space-y-4">\n                <div className="flex items-center justify-between">\n                  <div className="flex items-center gap-2">\n                    {settings.soundEnabled ? (\n                      <Volume2 className="h-4 w-4 text-[#1C4E9A]" />\n                    ) : (\n                      <VolumeX className="h-4 w-4 text-muted-foreground" />\n                    )}\n                    <Label htmlFor="sound" className="text-sm font-heading cursor-pointer">\n                      Sonido\n                    </Label>\n                  </div>\n                  <Switch\n                    id="sound"\n                    checked={settings.soundEnabled}\n                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, soundEnabled: checked }))}\n                  />\n                </div>\n\n                <div className="flex items-center justify-between">\n                  <div className="flex items-center gap-2">\n                    <Bell className="h-4 w-4 text-[#1C4E9A]" />\n                    <Label htmlFor="desktop" className="text-sm font-heading cursor-pointer">\n                      Escritorio\n                    </Label>\n                  </div>\n                  <Switch\n                    id="desktop"\n                    checked={settings.desktopNotifications}\n                    onCheckedChange={(checked) => {\n                      setSettings((prev) => ({ ...prev, desktopNotifications: checked }))\n                      if (checked) requestNotificationPermission()\n                    }}\n                  />\n                </div>\n\n                <div className="flex items-center justify-between">\n                  <div className="flex items-center gap-2">\n                    <Bell className="h-4 w-4 text-[#1C4E9A]" />\n                    <Label htmlFor="email" className="text-sm font-heading cursor-pointer">\n                      Email (24h)\n                    </Label>\n                  </div>\n                  <Switch\n                    id="email"\n                    checked={settings.emailNotifications}\n                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}\n                  />\n                </div>\n              </div>\n\n              <Alert className="bg-[#F6C344]/10 border-[#F6C344]">\n                <Bell className="h-4 w-4 text-[#1C4E9A]" />\n                <AlertDescription className="text-xs text-foreground">\n                  Si un mensaje no es leído en 24 horas y tienes el email activado, recibirás una notificación por\n                  correo.\n                </AlertDescription>\n              </Alert>\n\n              <div className="pt-4 border-t space-y-3">\n                <h4 className="text-sm font-heading font-semibold text-[#1C4E9A]">Información</h4>\n                <div className="space-y-2 text-xs text-muted-foreground">\n                  <p>\n                    <strong>Seguridad:</strong> Todos los mensajes están encriptados de extremo a extremo.\n                  </p>\n                  <p>\n                    <strong>Privacidad:</strong> Solo tú y los administradores pueden ver esta conversación.\n                  </p>\n                  <p>\n                    <strong>Historial:</strong> El historial de mensajes se guarda de forma permanente.\n                  </p>\n                </div>\n              </div>\n            </CardContent>\n          </Card>\n        </div>\n      </main>\n    </div>\n  )\n}