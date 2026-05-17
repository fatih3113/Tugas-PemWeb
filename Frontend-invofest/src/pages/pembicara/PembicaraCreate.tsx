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

export default function PembicaraCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3000/pembicara", {
        name: data.name,
        role: data.role,
        email: data.email,
        photo: data.photo ?? "",
      });
      alert("Pembicara berhasil ditambahkan!");
      reset();
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal menambahkan pembicara.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Tambah Pembicara</h1>

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

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 text-white py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
  //by fatih
}