import pool from '../config/database.js';

export interface FontGroup {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  fonts?: Font[];
}

export interface Font {
  id: string;
  name: string;
  filename: string;
}

export interface CreateFontGroupData {
  name: string;
  description?: string;
  font_ids: string[];
}

export class FontGroupModel {
  static async findAll(): Promise<FontGroup[]> {
    const query = `
      SELECT 
        fg.id, 
        fg.name, 
        fg.description, 
        fg.created_at, 
        fg.updated_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', f.id,
              'name', f.name,
              'filename', f.filename
            )
          ) FILTER (WHERE f.id IS NOT NULL), 
          '[]'
        ) as fonts
      FROM font_groups fg
      LEFT JOIN font_group_fonts fgf ON fg.id = fgf.group_id
      LEFT JOIN fonts f ON fgf.font_id = f.id
      GROUP BY fg.id, fg.name, fg.description, fg.created_at, fg.updated_at
      ORDER BY fg.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: string): Promise<FontGroup | null> {
    const query = `
      SELECT 
        fg.id, 
        fg.name, 
        fg.description, 
        fg.created_at, 
        fg.updated_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', f.id,
              'name', f.name,
              'filename', f.filename
            )
          ) FILTER (WHERE f.id IS NOT NULL), 
          '[]'
        ) as fonts
      FROM font_groups fg
      LEFT JOIN font_group_fonts fgf ON fg.id = fgf.group_id
      LEFT JOIN fonts f ON fgf.font_id = f.id
      WHERE fg.id = $1
      GROUP BY fg.id, fg.name, fg.description, fg.created_at, fg.updated_at
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async create(groupData: CreateFontGroupData): Promise<FontGroup> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Create font group
      const groupQuery = `
        INSERT INTO font_groups (name, description)
        VALUES ($1, $2)
        RETURNING id, name, description, created_at, updated_at
      `;
      const groupResult = await client.query(groupQuery, [groupData.name, groupData.description]);
      const group = groupResult.rows[0];
      
      // Add fonts to group
      if (groupData.font_ids.length > 0) {
        const fontGroupQuery = `
          INSERT INTO font_group_fonts (group_id, font_id)
          VALUES ${groupData.font_ids.map((_, index) => `($1, $${index + 2})`).join(', ')}
        `;
        await client.query(fontGroupQuery, [group.id, ...groupData.font_ids]);
      }
      
      await client.query('COMMIT');
      
      // Fetch complete group with fonts
      return await this.findById(group.id) || group;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async update(id: string, groupData: Partial<CreateFontGroupData>): Promise<FontGroup | null> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Update group basic info
      if (groupData.name || groupData.description) {
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 2;
        
        if (groupData.name) {
          updateFields.push(`name = $${paramIndex++}`);
          updateValues.push(groupData.name);
        }
        
        if (groupData.description !== undefined) {
          updateFields.push(`description = $${paramIndex++}`);
          updateValues.push(groupData.description);
        }
        
        const updateQuery = `
          UPDATE font_groups 
          SET ${updateFields.join(', ')}, updated_at = NOW()
          WHERE id = $1
        `;
        await client.query(updateQuery, [id, ...updateValues]);
      }
      
      // Update font associations if provided
      if (groupData.font_ids) {
        // Remove existing associations
        await client.query('DELETE FROM font_group_fonts WHERE group_id = $1', [id]);
        
        // Add new associations
        if (groupData.font_ids.length > 0) {
          const fontGroupQuery = `
            INSERT INTO font_group_fonts (group_id, font_id)
            VALUES ${groupData.font_ids.map((_, index) => `($1, $${index + 2})`).join(', ')}
          `;
          await client.query(fontGroupQuery, [id, ...groupData.font_ids]);
        }
      }
      
      await client.query('COMMIT');
      
      return await this.findById(id);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async delete(id: string): Promise<boolean> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Delete font associations first
      await client.query('DELETE FROM font_group_fonts WHERE group_id = $1', [id]);
      
      // Delete the group
      const result = await client.query('DELETE FROM font_groups WHERE id = $1', [id]);
      
      await client.query('COMMIT');
      
      return result.rowCount > 0;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}