import { Request, Response, NextFunction } from 'express';
import {
  deleteOneDepartamentoByIdService, createDepartamentoService,
  getAllDepartamentoService, getAllDepartamentoForSelectService
} from '../services/departamento'
import createHttpError from 'http-errors'

export const createDepartamentoController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createDepartamentoService(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const deleteOneDepartamentoByIdController= async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteOneDepartamentoByIdService(id);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getAllDepartamentoController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllDepartamentoService({
      page: parseInt(page as string),
      limit: typeof limit === 'undefined' ? undefined : parseInt(limit as string)
    });
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getAllDepartamentoForSelectController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllDepartamentoForSelectService()
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}