import { Request, Response } from 'express';
import { FontGroupModel, CreateFontGroupData } from '../models/FontGroup.js';
import { validateFontGroup } from '../utils/validation.js';
import { handleError } from '../utils/errorHandler.js';

export class FontGroupController {
  static async getAllGroups(req: Request, res: Response): Promise<void> {
    try {
      const groups = await FontGroupModel.findAll();
      res.json({
        success: true,
        data: groups,
        message: 'Font groups retrieved successfully'
      });
    } catch (error) {
      handleError(res, error, 'Failed to retrieve font groups');
    }
  }

  static async getGroupById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const group = await FontGroupModel.findById(id);
      
      if (!group) {
        res.status(404).json({
          success: false,
          message: 'Font group not found'
        });
        return;
      }

      res.json({
        success: true,
        data: group,
        message: 'Font group retrieved successfully'
      });
    } catch (error) {
      handleError(res, error, 'Failed to retrieve font group');
    }
  }

  static async createGroup(req: Request, res: Response): Promise<void> {
    try {
      const { error } = validateFontGroup(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: error.details[0].message
        });
        return;
      }

      const groupData: CreateFontGroupData = {
        name: req.body.name,
        description: req.body.description,
        font_ids: req.body.font_ids
      };

      const group = await FontGroupModel.create(groupData);

      res.status(201).json({
        success: true,
        data: group,
        message: 'Font group created successfully'
      });
    } catch (error) {
      handleError(res, error, 'Failed to create font group');
    }
  }

  static async updateGroup(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const { error } = validateFontGroup(req.body, true);
      if (error) {
        res.status(400).json({
          success: false,
          message: error.details[0].message
        });
        return;
      }

      const group = await FontGroupModel.update(id, req.body);
      
      if (!group) {
        res.status(404).json({
          success: false,
          message: 'Font group not found'
        });
        return;
      }

      res.json({
        success: true,
        data: group,
        message: 'Font group updated successfully'
      });
    } catch (error) {
      handleError(res, error, 'Failed to update font group');
    }
  }

  static async deleteGroup(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await FontGroupModel.delete(id);
      
      if (deleted) {
        res.json({
          success: true,
          message: 'Font group deleted successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Font group not found'
        });
      }
    } catch (error) {
      handleError(res, error, 'Failed to delete font group');
    }
  }
}