import { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository } from 'typeorm';
import Paginate from 'jw-paginate';
import Server from '../db/models/Server.Model';

export const createServer = async (req: Request, res: Response) => {
  try {
    const serverRepo = getRepository(Server);
    const newServer = await serverRepo.create(req.body);
    const results = await serverRepo.save(newServer);
    res.status(200).json({
      status: 'successful',
      data: results,
    });
  } catch (error) {
    res.status(400).json({ error });
    // next(error);
  }
};

export const getAllServers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const serverRepo = getRepository(Server);
    const servers = await serverRepo.find({
      order: {
        updatedAt: 'DESC',
      },
    });
    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(servers.length, pageNumber, 8);

    const pageServer = servers.slice(pager.startIndex, pager.endIndex + 1);
    res.status(200).json({
      status: 'successful',
      data: pageServer,
      pager,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllActiveOrInactiveServer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { isActive } = req.query;
    let search = true;
    if (isActive === 'false') {
      search = false;
    }
    const serverRepo = getRepository(Server);
    const servers = await serverRepo.find({
      where: {
        isActive: `${search}`,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(servers.length, pageNumber, 8);

    const pageServer = servers.slice(pager.startIndex, pager.endIndex + 1);
    res.status(200).json({
      status: 'successful',
      data: pageServer,
      pager,
    });
  } catch (error) {
    next(error);
  }
};

export const findByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.params;

    const serverRepo = getRepository(Server);
    const servers = await serverRepo.find({
      where: {
        serverName: `${name}`,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(servers.length, pageNumber, 8);

    const pageServer = servers.slice(pager.startIndex, pager.endIndex + 1);
    res.status(200).json({
      status: 'successful',
      data: pageServer,
      pager,
    });
  } catch (error) {
    next(error);
  }
};

export const updateServer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const serverRepo = getRepository(Server);
    const app = await serverRepo.findOne(id);
    serverRepo.merge(app!, req.body);
    const updated = await serverRepo.save(app!);
    res.status(200).json({
      status: 'successful',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const serverSwitch = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const serverRepo = getRepository(Server);
    const server = await serverRepo.findOne(id);

    let update = true;
    if (server!.isActive) {
      update = false;
    } else {
      update = true;
    }

    await getConnection('default')
      .createQueryBuilder()
      .update(Server)
      .set({ isActive: update })
      .where('id = :id', { id })
      .execute();
  } catch (error) {
    next(error);
  }
};
