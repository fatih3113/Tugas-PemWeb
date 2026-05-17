// src/pages/dashboard/category/index.tsx

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: number;
  nama: string;
};

const TABLE_HEADERS = ["No", "Nama Kategori", "Aksi"];

function CategoryRow({
  item,
  index,
  onDelete,
}: {
  item: Category;
  index: number;
  onDelete: (id: number) => void;
}) {
  return (
    <tr className="border-b border-gray-50 hover:bg-rose-50/40 transition-colors">
      <td className="px-4 py-3.5 text-sm text-gray-300 w-10">{index + 1}</td>

      <td className="px-4 py-3.5 text-sm font-semibold text-[#1a0a10]">
        {item.nama}
      </td>

      <td className="px-4 py-3.5">
        <div className="flex gap-2">
          <Link
            to={`/dashboard/category/edit/${item.id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(item.id)}
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data.data);
    } catch {
      alert("Gagal mengambil data kategori.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Gagal menghapus kategori.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="px-7 py-8 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-0.5 bg-[#7B1D3F] rounded-full inline-block" />
            <span className="text-[10px] font-semibold text-[#7B1D3F] tracking-widest uppercase">
              Manajemen
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a0a10] tracking-tight">Kategori</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola kategori event Invofest</p>
        </div>

        <Link
          to="/dashboard/category/create"
          className="flex items-center gap-1.5 bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <span className="text-base leading-none">+</span>
          Tambah Kategori
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-4 py-2.5 text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!loading &&
              categories.map((item, index) => (
                <CategoryRow
                  key={item.id}
                  item={item}
                  index={index}
                  onDelete={handleDelete}
                />
              ))}
          </tbody>
        </table>

        {loading && (
          <div className="flex justify-center py-14">
            <p className="text-sm text-gray-400">Memuat data...</p>
          </div>
        )}

        {!loading && categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-14 gap-2">
            <span className="text-3xl">🗂️</span>
            <p className="text-sm text-gray-400 font-medium">Belum ada kategori</p>
            <p className="text-xs text-gray-300">Tambah kategori pertama kamu</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-50">
          <span className="text-xs text-gray-300">
            Menampilkan {categories.length} kategori
          </span>
        </div>
      </div>
    </div>
  );
  //by fatih
}