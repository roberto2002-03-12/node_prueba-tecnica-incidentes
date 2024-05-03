import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import {
  createIncidenteService, deleteIncidenteService,
  getAllIncidenteByQueriesService, getOneIncidenteByIdService,
  updateIncidenteService
} from '../services/incidente'
import { validateFromObject } from '../../../helper'
import { createIncidenteSchema } from '../validation/incidente.validation';
import { IToken } from '../../../shared/models';
import { CreateIncidente, IFoto, IncidenteEstadoType } from '../model';

export const createIncidenteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken;
    
    const jsonParsed: CreateIncidente = JSON.parse(req.body.jsonStringify);
    const resultValidation = validateFromObject(createIncidenteSchema, jsonParsed);
    
    if (resultValidation === true) {

      const result = await createIncidenteService(
        jsonParsed, 
        user.sub, 
        req.files ? req.files as Express.Multer.File[] : undefined
      );

      return res.status(201).json(result)
    } else {
      return res.status(400).json(resultValidation)
    }
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const deleteIncidenteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)
    const result = await deleteIncidenteService(id);
    return res.status(201).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getAllIncidenteByQueriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // recuerda agregar los queries
    const { 
      page, limit, bloqueId, estado, 
      createdAtStart, createdAtEnd 
    } = req.query;
    const result = await getAllIncidenteByQueriesService({
      page: parseInt((page as string) ?? '1'),
      limit: typeof limit === 'undefined' ? undefined : parseInt(limit as string),
      bloqueId: typeof bloqueId === 'undefined' ? undefined : parseInt(bloqueId as string),
      estado: typeof estado === 'undefined' ? undefined : estado as IncidenteEstadoType,
      createdAtStart: createdAtStart?.toString(),
      createdAtEnd: createdAtEnd?.toString(),
    });
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getAllIncidenteByQueriesForClientsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken;
    const { 
      page, limit, bloqueId, estado, 
      createdAtStart, createdAtEnd
    } = req.query;
    const result = await getAllIncidenteByQueriesService({
      page: parseInt((page as string) ?? '1'),
      limit: typeof limit === 'undefined' ? undefined : parseInt(limit as string),
      bloqueId: typeof bloqueId === 'undefined' ? undefined : parseInt(bloqueId as string),
      estado: typeof estado === 'undefined' ? undefined : estado as IncidenteEstadoType,
      createdAtStart: createdAtStart?.toString(),
      createdAtEnd: createdAtEnd?.toString(),
    }, user.sub);
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const getOneIncidenteByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)
    const result = await getOneIncidenteByIdService(id);
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}

export const updateIncidenteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id)
    const user = req.user as IToken;
    const result = await updateIncidenteService(id, req.body, user.sub);
    return res.status(200).json(result);
  } catch (error: any) {
    next(createHttpError(500, error));
  }
}