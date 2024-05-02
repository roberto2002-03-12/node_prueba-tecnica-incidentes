import { Request, Response, NextFunction } from 'express';
import {
  createBloqueService, deleteOneBloqueByIdService,
  getAllBloquesService, getAllBloquesForSelectService
} from '../services/bloque'
import createHttpError from 'http-errors'

export const createBloqueController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createBloqueService(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const deleteOneBloqueByIdController= async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteOneBloqueByIdService(id);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getAllBloquesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllBloquesService({
      page: parseInt(page as string),
      limit: typeof limit === 'undefined' ? undefined : parseInt(limit as string)
    });
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}


export const getAllBloquesForSelectController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllBloquesForSelectService()
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}