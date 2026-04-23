import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom"; // ✅ ini yang benar
import Input from "../component/ui/Input";

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(2, "Username harus diisi").max(100),
  password: z.string().min(8, "Minimal 8 karakter").max(100),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Data Login:", data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Input
          label="Username"
          name="username"
          register={register}
          error={errors.username?.message}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        {/* ✅ FIX BAGIAN INI */}
        <div className="text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </form>
    </div>
  );
}