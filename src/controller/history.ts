import { Request, Response, NextFunction } from 'express';
import { /* getConnection, */ getRepository } from 'typeorm';
import Paginate from 'jw-paginate';
import History from '../db/models/History.Model';
import Application from '../db/models/Application.Model';

export const getAllHistory = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const historyRepo = getRepository(History);
    const [history, total] = await historyRepo.findAndCount();

    res.status(200).json({
      status: 'successful',
      total,
      history,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllHistoryRelation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const historyRepo = getRepository(History);
    const history = await historyRepo.find(
      { relations: ['application'] },
    );
    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(history.length, pageNumber, 8);

    const pageHistory = history.slice(pager.startIndex, pager.endIndex + 1);
    res.status(200).json({
      status: 'successful',
      data: pageHistory,
      pager,
    });
  } catch (error) {
    next(error);
  }
};

export const getUniqueName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.params;

  const historyRepo = getRepository(History);
  const appRepo = getRepository(Application);
  try {
    const app = await appRepo.findOneOrFail(name);
    const histories = await historyRepo.find({
      where: {
        applicationId: `${app.id}`,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(histories.length, pageNumber, 8);

    const pageHistory = histories.slice(pager.startIndex, pager.endIndex + 1);

    res.status(200).json({
      status: 'successful',
      data: pageHistory,
      pager,
    });
  } catch (error) {
    next(error);
  }
};

export const getUniqueId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const historyRepo = getRepository(History);
  try {
    const histories = await historyRepo.find({
      where: {
        applicationId: `${id}`,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(histories.length, pageNumber, 8);

    const pageHistory = histories.slice(pager.startIndex, pager.endIndex + 1);

    res.status(200).json({
      status: 'successful',
      data: pageHistory,
      pager,
    });
  } catch (error) {
    next(error);
  }
};

export const count = async () => { };
