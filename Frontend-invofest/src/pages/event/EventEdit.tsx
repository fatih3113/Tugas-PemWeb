// src/pages/dashboard/event/edit.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  name: z.string().min(3, "Nama event minimal 3 karakter"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

type FormData = z.infer<typeof schema>;
type Category = { id: number; nama: string };

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Fetch kategori & data event by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, eventRes] = await Promise.all([
          axios.get("http://localhost:3000/categories"),
          axios.get(`http://localhost:3000/events/${id}`),
        ]);

        setCategories(catRes.data.data);

        const e = eventRes.data.data;
        reset({
          name: e.name,
          categoryId: String(e.categoryId),
          date: new Date(e.dateEvent).toISOString().split("T")[0],
          location: e.location,
          description: e.description,
        });
      } catch {
        alert("Gagal mengambil data.");
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`http://localhost:3000/events/${id}`, {
        name: data.name,
        categoryId: Number(data.categoryId),
        location: data.location,
        dateEvent: new Date(data.date).toISOString(),
        description: data.description,
      });
      alert("Event berhasil diupdate!");
      navigate("/dashboard/event");
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal mengupdate event.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("name")}
          placeholder="Nama Event"
          className="border p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <select {...register("categoryId")} className="border p-2 rounded">
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nama}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500">{errors.categoryId.message}</p>
        )}

        <input
          type="date"
          {...register("date")}
          className="border p-2 rounded"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        <input
          {...register("location")}
          placeholder="Lokasi Event"
          className="border p-2 rounded"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}

        <textarea
          {...register("description")}
          placeholder="Deskripsi Event"
          className="border p-2 rounded"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/event")}
            className="flex-1 border border-gray-300 text-gray-600 py-2 rounded hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#7B1D3F] text-white py-2 rounded hover:bg-[#9e2550] transition disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
  //by fatih
}