// src/pages/dashboard/pembicara/edit.tsx

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
      .get(`http://localhost:3000/pembicara/${id}`)
      .then((res) => {
        const d = res.data.data;
        reset({ name: d.name, role: d.role, email: d.email, photo: d.photo });
      })
      .catch(() => alert("Gagal mengambil data pembicara."));
  }, [id]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`http://localhost:3000/pembicara/${id}`, {
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
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Pembicara</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("name")}
          placeholder="Nama"
          className="border p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("role")}
          placeholder="Role / Jabatan"
          className="border p-2 rounded"
        />
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("photo")}
          placeholder="URL Foto"
          className="border p-2 rounded"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/pembicara")}
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