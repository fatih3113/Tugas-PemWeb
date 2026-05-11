import type { Request, Response } from "express";
import type { Category } from "../types/category";

let categories: Category[] = [];

// 1. Get all
export const getAllCategories = (req: Request, res: Response) => {
    return res.json(categories);
};

// 2. Create
export const createCategory = (req: Request, res: Response) => {
    const { nama } = req.body as { nama?: string };

    if (!nama) {
        return res.status(400).json({ message: "Nama wajib diisi" });
    }

    const newCategory: Category = {
        id: categories.length > 0
            ? Math.max(...categories.map(c => c.id)) + 1
            : 1,
        nama
    };

    categories.push(newCategory);

    return res.status(201).json(newCategory);
};

// 3. Get by ID
export const getCategoryById = (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "ID tidak valid" });
    }

    const category = categories.find(c => c.id === id);

    if (!category) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }

    return res.json(category);
};

// 4. Update
export const updateCategory = (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "ID tidak valid" });
    }

    const category = categories.find(c => c.id === id);

    if (!category) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }

    const { nama } = req.body as { nama?: string };

    if (nama !== undefined) {
        category.nama = nama;
    }

    return res.json(category);
};

// 5. Delete
export const deleteCategory = (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "ID tidak valid" });
    }

    const index = categories.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }

    const deleted = categories[index];
    categories.splice(index, 1);

    return res.json({
        message: "Category berhasil dihapus",
        data: deleted
    });
};