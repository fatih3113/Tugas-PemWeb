// src/pages/dashboard/index.tsx

import { useEffect, useState } from "react";
import axios from "axios";

type Stat = { title: string; value: number; icon: string };
type EventItem = { id: number; name: string; category: { nama: string }; dateEvent: string };
type SpeakerItem = { id: number; name: string; role: string; photo: string }; // ← tambah photo

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {stat.title}
        </span>
        <span className="text-xl">{stat.icon}</span>
      </div>
      <p className="text-3xl font-bold text-[#1a0a10] tracking-tight">{stat.value}</p>
      <div className="h-1 w-8 bg-[#7B1D3F] rounded-full" />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-3 h-0.5 bg-[#7B1D3F] rounded-full inline-block" />
      <h2 className="text-sm font-bold text-[#1a0a10] tracking-tight">{title}</h2>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([
    { title: "Kategori", value: 0, icon: "🗂️" },
    { title: "Event", value: 0, icon: "📅" },
    { title: "Pembicara", value: 0, icon: "🎤" },
  ]);
  const [latestEvents, setLatestEvents] = useState<EventItem[]>([]);
  const [latestSpeakers, setLatestSpeakers] = useState<SpeakerItem[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catRes, eventRes, speakerRes] = await Promise.all([
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/events"),
          axios.get("http://localhost:3000/pembicara"),
        ]);

        const categories = catRes.data.data;
        const events = eventRes.data.data;
        const speakers = speakerRes.data.data;

        setStats([
          { title: "Kategori", value: categories.length, icon: "🗂️" },
          { title: "Event", value: events.length, icon: "📅" },
          { title: "Pembicara", value: speakers.length, icon: "🎤" },
        ]);

        setLatestEvents(events.slice(0, 3));
        setLatestSpeakers(speakers.slice(0, 3));
      } catch {
        alert("Gagal mengambil data dashboard.");
      }
    };

    fetchAll();
  }, []);

  const colors = [
    "from-[#7B1D3F] to-[#c9395e]",
    "from-[#1a4f7B] to-[#3982c9]",
    "from-[#1a7B3F] to-[#39c970]",
  ];

  return (
    <div className="px-7 py-8 max-w-5xl mx-auto space-y-8">

      {/* PAGE TITLE */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-0.5 bg-[#7B1D3F] rounded-full inline-block" />
          <span className="text-[10px] font-semibold text-[#7B1D3F] tracking-widest uppercase">
            Overview
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#1a0a10] tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Ringkasan data Invofest hari ini</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Event Terbaru */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Event Terbaru" />
          <ul>
            {latestEvents.map((item, i) => (
              <li
                key={item.id}
                className={`flex items-center justify-between py-3 ${
                  i === latestEvents.length - 1 ? "" : "border-b border-gray-50"
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-[#1a0a10]">{item.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.dateEvent).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span className="text-xs font-medium bg-rose-50 text-[#7B1D3F] px-2.5 py-1 rounded-full">
                  {item.category.nama}
                </span>
              </li>
            ))}
          </ul>
        </div>

       {/* Pembicara Terbaru */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Pembicara Terbaru" />
          <ul>
            {latestSpeakers.map((item, i) => {
              const initials = item.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <li
                  key={item.id}
                  className={`flex items-center gap-3 py-3 ${
                    i === latestSpeakers.length - 1 ? "" : "border-b border-gray-50"
                  }`}
                >
                  {/* ← Ganti bagian avatar ini */}
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      className={`w-9 h-9 rounded-full bg-linear-to-br ${colors[i % colors.length]} text-white text-xs font-bold flex items-center justify-center`}
                    >
                      {initials}
                    </div>
                  )}

                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-[#1a0a10]">{item.name}</span>
                    <span className="text-xs text-gray-400">{item.role}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
}