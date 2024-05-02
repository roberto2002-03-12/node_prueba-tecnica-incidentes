import { Request, Response, NextFunction } from 'express';
import {
  createCatService, updateCatService,
  deleteCatService, getOneCatService,
  getAllCatsService
} from '../service';
import createHttpError from 'http-errors';

export const createCatController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createCatService(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const updateCatController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    const result = await updateCatService(req.body, id);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const deleteCatController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    const result = await deleteCatService(id);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getOneCatController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    const result = await getOneCatService(id);
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getAllCatsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, race, birthStart, birthEnd, highestPrice, minimumPrice, order, page, limit } = req.query;
    const result = await getAllCatsService({
      name: name?.toString(),
      race: race?.toString(),
      birthStart: birthStart?.toString(),
      birthEnd: birthEnd?.toString(),
      highestPrice: typeof highestPrice === 'undefined' ? undefined : Number(highestPrice as string),
      minimumPrice: typeof minimumPrice === 'undefined' ? undefined : Number(minimumPrice as string),
      order: typeof order !== 'undefined' && order === 'ASC' ? 'ASC' : 'DESC',
      page: parseInt(page as string),
      limit: typeof limit === 'undefined' ? undefined : Number(limit as string),
    });
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

