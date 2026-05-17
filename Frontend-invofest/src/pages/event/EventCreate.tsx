import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().min(3, "Nama event minimal 3 karakter"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

type FormData = z.infer<typeof schema>;

type Category = {
  id: number;
  nama: string;
};

export default function EventCreate() {
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Fetch kategori dari backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((res) => setCategories(res.data.data))
      .catch(() => alert("Gagal mengambil data kategori."));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3000/events", {
        name: data.name,
        categoryId: Number(data.categoryId),
        location: data.location,
        dateEvent: new Date(data.date).toISOString(),
        description: data.description,
      });
      alert("Event berhasil dibuat!");
      reset();
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal membuat event.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Tambah Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Nama */}
        <input
          {...register("name")}
          placeholder="Nama Event"
          className="border p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Kategori dari API */}
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

        {/* Tanggal */}
        <input
          type="date"
          {...register("date")}
          className="border p-2 rounded"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        {/* Lokasi */}
        <input
          {...register("location")}
          placeholder="Lokasi Event"
          className="border p-2 rounded"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}

        {/* Deskripsi */}
        <textarea
          {...register("description")}
          placeholder="Deskripsi Event"
          className="border p-2 rounded"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 text-white py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Event"}
        </button>
      </form>
    </div>
  );
  //by fatih
}