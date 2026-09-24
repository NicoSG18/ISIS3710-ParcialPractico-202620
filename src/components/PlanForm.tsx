"use client";

import { useState } from "react";

interface PlanesFormProps {
  onAdd: (plan: {
    name: string;
    description: string;
    estimatedPrice: number;
    estimatedTime: number;
    recomendations: string;
    address: string;
    image: string;
  }) => void | Promise<void>;
}

export default function PlanForm({ onAdd }: PlanesFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [recomendations, setRecomendations] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onAdd({
      name,
      description,
      estimatedPrice: Number(estimatedPrice),
      estimatedTime: Number(estimatedTime),
      recomendations,
      address,
      image,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid max-w-2xl gap-4">
      <h1 className="text-4xl font-bold text-slate-900">Crear plan</h1>
      <input
        type="text"
        placeholder="Nombre del plan"
        value={name}
        onChange={(e) => setName(e.target.value)}
        minLength={2}
        maxLength={50}
        required
        className="border p-2"
      />
      <input
        type="url"
        placeholder="Link de imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Precio estimado"
        value={estimatedPrice}
        onChange={(e) => setEstimatedPrice(e.target.value)}
        min="0.01"
        required
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Duración en minutos"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
        min="1"
        step="1"
        required
        className="border p-2"
      />
      <textarea
        placeholder="Descripción del plan"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={599}
        required
        className="border p-2"
      />
      <textarea
        placeholder="Recomendaciones para los asistentes (opcional)"
        value={recomendations}
        onChange={(e) => setRecomendations(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-600 p-2 text-white">
        Publicar plan
      </button>
    </form>
  );
}