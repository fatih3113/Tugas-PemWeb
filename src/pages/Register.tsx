import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; // ✅ TAMBAH INI
import Input from "../component/ui/Input";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    username: z.string().min(2, "Username harus diisi").max(100),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Data Register:", data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
        <Input
          label="Username"
          name="username"
          register={register}
          error={errors.username?.message}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword?.message}
        />

        <button
          type="submit"
          className="bg-red-600 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>

        {/* ✅ TAMBAHAN DI SINI */}
        <div className="text-sm text-center mt-2">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login sekarang
          </Link>
        </div>

      </form>
    </div>
  );
}