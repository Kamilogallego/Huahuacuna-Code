"use client"

import { useState } from "react"
import { createChild, type CreateChildDto, type Gender } from "@/lib/services/children.service"

export default function AdminChildrenCreatePage() {
  const [form, setForm] = useState<CreateChildDto>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "MALE",
    municipality: "",
    shortDescription: "",
    fullStory: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdId, setCreatedId] = useState<number | null>(null)

  const handleChange = (field: keyof CreateChildDto) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setCreatedId(null)
    setLoading(true)

    try {
      // TODO: reemplazar con el userId real (por ejemplo, decodificando el token o trayéndolo del profile)
      const userId = 1
      const res = await createChild(form, userId)
      setCreatedId(res.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al crear el niño")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Niño</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.firstName}
            onChange={handleChange("firstName")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Apellido</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.lastName}
            onChange={handleChange("lastName")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha de nacimiento</label>
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={form.dateOfBirth}
            onChange={handleChange("dateOfBirth")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Género</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={form.gender}
            onChange={handleChange("gender") as any}
          >
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Municipio</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.municipality}
            onChange={handleChange("municipality")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción corta</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={form.shortDescription}
            onChange={handleChange("shortDescription")}
            maxLength={200}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Historia completa</label>
          <textarea
            className="border rounded px-3 py-2 w-full"
            value={form.fullStory}
            onChange={handleChange("fullStory")}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Creando..." : "Crear Niño"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
      {createdId && (
        <p className="mt-4 text-green-700 text-sm">Niño creado con ID: {createdId}</p>
      )}
    </main>
  )
}
