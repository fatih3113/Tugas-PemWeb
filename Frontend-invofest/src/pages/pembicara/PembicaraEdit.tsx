// src/pages/dashboard/pembicara/Edit.tsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  role: z.string().min(3, "Role minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  photo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function PembicaraEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Ambil data default berdasarkan ID pembicara
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/pembicara/${id}`)
      .then((res) => {
        const d = res.data?.data;
        if (d) {
          reset({ 
            name: d.name, 
            role: d.role, 
            email: d.email, 
            photo: d.photo ?? "" 
          });
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal mengambil data pembicara.");
      });
  }, [id, baseUrl, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`${baseUrl}/api/pembicara/${id}`, {
        name: data.name,
        role: data.role,
        email: data.email,
        photo: data.photo ?? "",
      });
      alert("Pembicara berhasil diupdate!");
      navigate("/dashboard/pembicara");
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal mengupdate pembicara.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-bold text-[#1a0a10] mb-1">Edit Pembicara</h1>
      <p className="text-sm text-gray-400 mb-6">Ubah data informasi pembicara event.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nama Pembicara</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Nama"
            className="w-full border p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#7B1D3F] focus:ring-1 focus:ring-[#7B1D3F]"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Role / Jabatan</label>
          <input
            {...register("role")}
            type="text"
            placeholder="Role / Jabatan"
            className="w-full border p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#7B1D3F] focus:ring-1 focus:ring-[#7B1D3F]"
          />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            className="w-full border p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#7B1D3F] focus:ring-1 focus:ring-[#7B1D3F]"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">URL Foto</label>
          <input
            {...register("photo")}
            type="text"
            placeholder="URL Foto"
            className="w-full border p-2.5 rounded-xl text-sm focus:outline-none focus:border-[#7B1D3F] focus:ring-1 focus:ring-[#7B1D3F]"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/pembicara")}
            className="flex-1 border border-gray-200 text-gray-500 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition text-sm"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#7B1D3F] text-white py-2.5 rounded-xl hover:bg-[#9e2550] transition text-sm disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}