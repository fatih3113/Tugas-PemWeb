// src/controllers/pembicaraController.ts

import type { Request, Response } from "express";
import type { Pembicara } from "../types/pembicara";


let pembicaraList: Pembicara[] = [];


// 1. GET ALL

export const getAllPembicara = (req: Request, res: Response) => {
  return res.json(pembicaraList);
};


// 2. GET BY ID

export const getPembicaraById = (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID tidak valid" });
  }

  const data = pembicaraList.find((p) => p.id === id);

  if (!data) {
    return res.status(404).json({ message: "Pembicara tidak ditemukan" });
  }

  return res.json(data);
};


// 3. CREATE

export const createPembicara = (req: Request, res: Response) => {
  const { name, pekerjaan, email, photo } = req.body as {
    name?: string;
    pekerjaan?: string;
    email?: string;
    photo?: string;
  };

  if (!name || !pekerjaan || !email || !photo) {
    return res.status(400).json({
      message: "Semua field wajib diisi",
    });
  }

  const newData: Pembicara = {
    id:
      pembicaraList.length > 0
        ? Math.max(...pembicaraList.map((p) => p.id)) + 1
        : 1,
    name,
    pekerjaan,
    email,
    photo,
  };

  pembicaraList.push(newData);

  return res.status(201).json(newData);
};


// 4. UPDATE

export const updatePembicara = (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID tidak valid" });
  }

  const data = pembicaraList.find((p) => p.id === id);

  if (!data) {
    return res.status(404).json({ message: "Pembicara tidak ditemukan" });
  }

  const { name, pekerjaan, email, photo } = req.body as {
    name?: string;
    pekerjaan?: string;
    email?: string;
    photo?: string;
  };

  if (name !== undefined) data.name = name;
  if (pekerjaan !== undefined) data.pekerjaan = pekerjaan;
  if (email !== undefined) data.email = email;
  if (photo !== undefined) data.photo = photo;

  return res.json(data);
};


// 5. DELETE

export const deletePembicara = (
  req: Request<{ id: string }>,
  res: Response
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID tidak valid" });
  }

  const index = pembicaraList.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Pembicara tidak ditemukan" });
  }

  const deleted = pembicaraList[index];
  pembicaraList.splice(index, 1);

  return res.json({
    message: "Pembicara berhasil dihapus",
    data: deleted,
  });
};