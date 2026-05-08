import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, "Nama event minimal 3 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function EventCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Event:", data);
    alert("Event berhasil dibuat!");
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

        {/* Kategori */}
        <select {...register("category")} className="border p-2 rounded">
          <option value="">Pilih Kategori</option>
          <option value="Seminar">Seminar</option>
          <option value="Workshop">Workshop</option>
          <option value="Competition">Competition</option>
        </select>
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}

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
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}

        {/* Deskripsi */}
        <textarea
          {...register("description")}
          placeholder="Deskripsi Event"
          className="border p-2 rounded"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <button className="bg-red-600 text-white py-2 rounded">
          Simpan Event
        </button>
      </form>
    </div>
  );
}