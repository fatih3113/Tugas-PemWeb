import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  name: z.string().min(3, "Nama kategori minimal 3 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function CategoryCreate() {
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
      await axios.post("http://localhost:3000/categories", {
        nama: data.name,
      });
      alert("Kategori berhasil dibuat!");
      reset();
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Gagal membuat kategori.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">Tambah Kategori Event</h1>
      <p className="text-sm text-gray-500 mb-6">
        Digunakan untuk mengelompokkan event seperti Seminar, Workshop, dll.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Nama Kategori</label>
          <input
            type="text"
            placeholder="Contoh: Seminar"
            {...register("name")}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Kategori"}
        </button>
      </form>
    </div>
  );
  //by fatih
}