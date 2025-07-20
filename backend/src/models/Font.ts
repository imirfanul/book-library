import pool from '../config/database.js';
import { RowDataPacket } from 'pg';

export interface Font {
  id: string;
  name: string;
  filename: string;
  file_path: string;
  file_size: number;
  uploaded_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFontData {
  name: string;
  filename: string;
  file_path: string;
  file_size: number;
}

export class FontModel {
  static async findAll(): Promise<Font[]> {
    const query = `
      SELECT id, name, filename, file_path, file_size, uploaded_at, created_at, updated_at
      FROM fonts 
      ORDER BY uploaded_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: string): Promise<Font | null> {
    const query = `
      SELECT id, name, filename, file_path, file_size, uploaded_at, created_at, updated_at
      FROM fonts 
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async create(fontData: CreateFontData): Promise<Font> {
    const query = `
      INSERT INTO fonts (name, filename, file_path, file_size, uploaded_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, name, filename, file_path, file_size, uploaded_at, created_at, updated_at
    `;
    const values = [fontData.name, fontData.filename, fontData.file_path, fontData.file_size];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM fonts WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  static async update(id: string, fontData: Partial<CreateFontData>): Promise<Font | null> {
    const fields = Object.keys(fontData);
    const values = Object.values(fontData);
    
    if (fields.length === 0) return null;

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const query = `
      UPDATE fonts 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING id, name, filename, file_path, file_size, uploaded_at, created_at, updated_at
    `;
    
    const result = await pool.query(query, [id, ...values]);
    return result.rows[0] || null;
  }
}