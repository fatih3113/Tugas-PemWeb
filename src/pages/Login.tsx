import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Input from "../component/ui/Input";
import { useAuthStore } from "../store/useAuthStore";

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(2, "Username harus diisi").max(100),
  password: z.string().min(8, "Minimal 8 karakter").max(100),
});

export default function Login() {
  // ❗ jangan pakai nama "Login" (bentrok dengan nama component)
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Data Login:", data);

    if (data.username === "24090002" && data.password === "24090002") {
      alert("Login berhasil!");
      login(data.username); // ✅ fix
      navigate("/dashboard");
    } else {
      alert("Login gagal! Pastikan username dan password benar.");
    }
  };


  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold  uppercase text-[#7B1D3F]">
          <span className="inline-block w-5 h-0.5 bg-[#7B1D3F] rounded-sm" />
          Invofest 2025
        </span>
        <h1 className="text-[28px] font-bold text-[#1a0a10] tracking-tight leading-tight">
          Selamat Datang
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Masuk untuk melanjutkan ke dashboard kamu
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>

        <Input
          label="Username"
          name="username"
          register={register}
          error={errors.username?.message}
        />

        <div className="flex flex-col gap-1">
          <Input
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />
          <div className="flex justify-end">
            <span className="text-xs text-[#7B1D3F] font-medium cursor-pointer hover:underline">
              Lupa password?
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#7B1D3F] hover:bg-[#9e2550] active:scale-[0.98] text-white font-semibold text-[15px] py-3 rounded-[10px] transition-all duration-200 tracking-tight mt-1"
        >
          Masuk →
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 text-gray-300 text-xs">
        <div className="flex-1 h-px bg-gray-200" />
        <span>atau</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Register link */}
      <p className="text-sm text-center text-gray-500">
        Belum punya akun?{" "}
        <Link to="/register" className="text-[#7B1D3F] font-semibold hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}