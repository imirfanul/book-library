import { Request, Response } from 'express';
import { FontModel, CreateFontData } from '../models/Font.js';
import { validateFont } from '../utils/validation.js';
import { handleError } from '../utils/errorHandler.js';
import fs from 'fs/promises';
import path from 'path';

export class FontController {
  static async getAllFonts(req: Request, res: Response): Promise<void> {
    try {
      const fonts = await FontModel.findAll();
      res.json({
        success: true,
        data: fonts,
        message: 'Fonts retrieved successfully'
      });
    } catch (error) {
      handleError(res, error, 'Failed to retrieve fonts');
    }
  }

  static async getFontById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const font = await FontModel.findById(id);
      
      if (!font) {
        res.status(404).json({
          success: false,
          message: 'Font not found'
        });
        return;
      }

      res.json({
        success: true,
        data: font,
        message: 'Font retrieved successfully'
      });
    } catch (error) {
      handleError(res, error, 'Failed to retrieve font');
    }
  }

  static async uploadFont(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No font file provided'
        });
        return;
      }

      const { error } = validateFont(req.file);
      if (error) {
        // Clean up uploaded file
        await fs.unlink(req.file.path);
        res.status(400).json({
          success: false,
          message: error.details[0].message
        });
        return;
      }

      const fontData: CreateFontData = {
        name: req.body.name || path.parse(req.file.originalname).name,
        filename: req.file.originalname,
        file_path: req.file.path,
        file_size: req.file.size
      };

      const font = await FontModel.create(fontData);

      res.status(201).json({
        success: true,
        data: font,
        message: 'Font uploaded successfully'
      });
    } catch (error) {
      // Clean up uploaded file on error
      if (req.file) {
        try {
          await fs.unlink(req.file.path);
        } catch (unlinkError) {
          console.error('Failed to clean up uploaded file:', unlinkError);
        }
      }
      handleError(res, error, 'Failed to upload font');
    }
  }

  static async updateFont(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const font = await FontModel.update(id, updateData);
      
      if (!font) {
        res.status(404).json({
          success: false,
          message: 'Font not found'
        });
        return;
      }

      res.json({
        success: true,
        data: font,
        message: 'Font updated successfully'
      });
    } catch (error) {
      handleError(res, error, 'Failed to update font');
    }
  }

  static async deleteFont(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Get font details before deletion to clean up file
      const font = await FontModel.findById(id);
      if (!font) {
        res.status(404).json({
          success: false,
          message: 'Font not found'
        });
        return;
      }

      const deleted = await FontModel.delete(id);
      
      if (deleted) {
        // Clean up the font file
        try {
          await fs.unlink(font.file_path);
        } catch (fileError) {
          console.error('Failed to delete font file:', fileError);
        }

        res.json({
          success: true,
          message: 'Font deleted successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Font not found'
        });
      }
    } catch (error) {
      handleError(res, error, 'Failed to delete font');
    }
  }
}