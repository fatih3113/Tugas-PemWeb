// src/pages/dashboard/category/edit.tsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  nama: z.string().min(3, "Nama kategori minimal 3 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Fetch data by ID → isi form
  useEffect(() => {
    axios
      .get(`http://localhost:3000/categories/${id}`)
      .then((res) => reset({ nama: res.data.data.nama }))
      .catch(() => alert("Gagal mengambil data kategori."));
  }, [id]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`http://localhost:3000/categories/${id}`, {
        nama: data.nama,
      });
      alert("Kategori berhasil diupdate!");
      navigate("/dashboard/category");
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal mengupdate kategori.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">Edit Kategori</h1>
      <p className="text-sm text-gray-500 mb-6">Ubah nama kategori event.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Nama Kategori</label>
          <input
            type="text"
            placeholder="Contoh: Seminar"
            {...register("nama")}
            className="w-full border p-2 rounded"
          />
          {errors.nama && (
            <p className="text-red-500 text-sm">{errors.nama.message}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/category")}
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
}