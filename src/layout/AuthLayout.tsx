import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full overflow-hidden bg-red-50">
      
      {/* Sisi Kiri: Gambar */}
      <div className="md:block w-full h-full flex items-center justify-center p-12">
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          
          {/* Hint teks kecil di atas gambar */}
          <p className="text-[#7B1D3F] text-xs font-medium opacity-70 tracking-wide">
            ← Klik gambar untuk kembali ke Beranda
          </p>

          {/* Gambar maskot yang bisa diklik */}
          <Link
            to="/"
            title="Kembali ke Beranda"
            className="group relative flex items-center justify-center"
          >
            <img
              src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png"
              alt="Maskot Invofest - Klik untuk ke Beranda"
              className="w-auto h-auto max-w-[80%] max-h-[70%] object-contain object-center transition-transform duration-500 group-hover:scale-110 cursor-pointer drop-shadow-xl"
            />

            {/* Tooltip muncul saat hover */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#7B1D3F] text-white text-xs font-semibold px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
              🏠 Kembali ke Beranda
            </span>
          </Link>
        </div>
      </div>

      {/* Sisi Kanan: Form Login/Register */}
      <div className="flex items-center justify-center p-8 bg-white h-full overflow-y-auto">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

    </div>
  );
}