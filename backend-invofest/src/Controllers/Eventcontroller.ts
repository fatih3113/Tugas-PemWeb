// src/Controllers/Eventcontroller.ts

import type { Request, Response } from "express";
import type { Event } from "../types/event";

// In-memory store
let events: Event[] = [];


// 1. GET ALL EVENTS

export const getAllEvents = (req: Request, res: Response) => {
  return res.status(200).json(events);
};


// 2. GET EVENT BY ID

export const getEventById = (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID tidak valid." });
  }

  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ message: "Event tidak ditemukan." });
  }

  return res.status(200).json(event);
};


// 3. CREATE EVENT

export const createEvent = (req: Request, res: Response) => {
  try {
    const { nama, tanggal, lokasi } = req.body as {
      nama?: string;
      tanggal?: string;
      lokasi?: string;
    };

    if (!nama || !tanggal || !lokasi) {
      return res.status(400).json({
        message: "Nama, tanggal, dan lokasi wajib diisi.",
      });
    }

    const newEvent: Event = {
      id:
        events.length > 0
          ? Math.max(...events.map((e) => e.id)) + 1
          : 1,
      nama,
      tanggal,
      lokasi,
    };

    events.push(newEvent);

    return res.status(201).json(newEvent);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal membuat event.",
      error: error instanceof Error ? error.message : error,
    });
  }
};


// 4. UPDATE EVENT

export const updateEvent = (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "ID tidak valid." });
    }

    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
    return res.status(404).json({ message: "Event tidak ditemukan." });
    }

    const { nama, tanggal, lokasi } = req.body as {
    nama?: string;
    tanggal?: string;
    lokasi?: string;
    };

    const event = events[index]!; // 🔥 FIX DI SINI

    if (nama !== undefined) event.nama = nama;
    if (tanggal !== undefined) event.tanggal = tanggal;
    if (lokasi !== undefined) event.lokasi = lokasi;

    events[index] = event;

    return res.json(event);
    

  } catch (error) {
    return res.status(500).json({
      message: "Gagal memperbarui event.",
      error: error instanceof Error ? error.message : error,
    });
  }
};


// 5. DELETE EVENT

export const deleteEvent = (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID tidak valid." });
  }

  const index = events.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Event tidak ditemukan." });
  }

  const deletedEvent = events[index];
  events.splice(index, 1);

  return res.status(200).json({
    message: "Event berhasil dihapus.",
    data: deletedEvent,
  });
};