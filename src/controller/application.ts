/* eslint-disable no-await-in-loop */
import { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository } from 'typeorm';
import Paginate from 'jw-paginate';
import axios from 'axios';
import Application from '../db/models/Application.Model';
import Server from '../db/models/Server.Model';
import History from '../db/models/History.Model';

export const getAllApplication = async (
  req: Request,
  res: Response,
) => {
  try {
    const appRepo = getRepository(Application);
    const applications = await appRepo.find({
      order: {
        updatedAt: 'DESC',
      },
    });
    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(applications.length, pageNumber, 8);

    const pageApp = applications.slice(pager.startIndex, pager.endIndex + 1);

    res.status(200).json({
      status: 'successful',
      data: pageApp,
      pager,
    });
  } catch (error) {
    res.status(error.status).send({ message: error.message });
  }
};

export const findByName = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name } = req.params;
    const appRepo = getRepository(Application);
    const applications = await appRepo.find({
      where: {
        applicationName: `${name}`,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(applications.length, pageNumber, 8);

    const pageApp = applications.slice(pager.startIndex, pager.endIndex + 1);

    res.status(200).json({
      status: 'successful',
      data: pageApp,
      pager,
    });
  } catch (error) {
    res.status(404).send({ message: 'Application Not Found!' });
  }
};

export const getAllActiveOrInactiveServer = async (
  req: Request,
  res: Response,
) => {
  try {
    const { isActive } = req.query;
    let search = true;
    if (isActive === 'false') {
      search = false;
    }
    const appRepo = getRepository(Application);
    const applications = await appRepo.find({
      where: {
        isActive: `${search}`,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(applications.length, pageNumber, 8);

    const pageApp = applications.slice(pager.startIndex, pager.endIndex + 1);

    res.status(200).json({
      status: 'successful',
      data: pageApp,
      pager,
    });
  } catch (error) {
    res.status(error.status).send({ message: 'error.message' });
  }
};

export const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    applicationName,
    applicationType,
    applicationDescription,
    applicationPort,
    endPoint,
    host,
  } = req.body;
  const app = {
    applicationName,
    applicationType,
    applicationDescription,
    applicationPort,
    endPoint,
  };
  try {
    const appRepo = getRepository(Application);
    const serverRepo = getRepository(Server);
    const newApp = await appRepo.create(app);
    const mapped = await serverRepo.findByIds(host);
    newApp.servers = mapped;
    const results = await appRepo.save(newApp);
    res.status(200).json({
      status: 'successful',
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

export const applicationSwitch = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const appRepo = getRepository(Application);
    const app = await appRepo.findOne(id);

    let update = true;
    if (app!.isActive) {
      update = false;
    } else {
      update = true;
    }

    await getConnection('default')
      .createQueryBuilder()
      .update(Application)
      .set({ isActive: update })
      .where('id = :id', { id })
      .execute();
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      applicationName,
      applicationType,
      applicationDescription,
      applicationPort,
      endPoint,
      host,
    } = req.body;
    const { id } = req.params;
    const appRepo = getRepository(Application);
    const serverRepo = getRepository(Server);
    const newApp = await appRepo.findOneOrFail(id);
    const mapped = await serverRepo.findByIds(host);
    newApp.applicationName = applicationName;
    newApp.applicationType = applicationType;
    newApp.applicationDescription = applicationDescription;
    newApp.applicationPort = applicationPort;
    newApp.endPoint = endPoint;
    newApp.servers = mapped;
    const results = await appRepo.save(newApp);
    res.status(200).json({
      status: 'successful',
      data: results,
    });
  } catch (error) {
    res.status(404).send({ message: 'Application not Found!' });
  }
};

export const relation = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const appRepo = getRepository(Application);
    const app = await appRepo.findOne(id, { relations: ['servers'] });

    res.status(200).json({
      status: 'successful',
      data: app,
    });
  } catch (error) {
    res.status(404).send({ message: 'Application Not Found!' });
  }
};

export const checkApplicationEndpoint = async (
  req: Request,
  res: Response,
) => {
  const {
    // appName,
    appId,
    appPort,
    appEndPoint,
    mappedServers,
    serversId,
  } = req.body;

  const HistoryRepo = getRepository(History);
  const serverRepo = getRepository(Server);

  const resultHolder = [];

  for (let i = 0; i < serversId.length; i += 1) {
    const id = serversId[i];
    try {
      // eslint-disable-next-line no-await-in-loop
      const mapped = await serverRepo.findOneOrFail(id);
      const url = `https://${mapped.serverIp}:${appPort}/${appEndPoint}`;
      // eslint-disable-next-line no-await-in-loop
      const result = await axios.get(url);

      let status = '';
      let isUp = true;
      if (result.status === 200) {
        status = 'Successful';
      } else if (result.status === 204 || result.status === 302) {
        status = 'Indeterminate';
      } else {
        status = 'Fail';
      }

      if (status !== 'Successful') {
        isUp = false;
      }
      const history = new History();
      history.status = status;
      history.serverMapped = `${mappedServers} Server`;
      history.dateScan = result.headers.date;
      history.url = result.config.url!;
      history.isUp = isUp;
      history.application = appId;
      const newCreatedHistory = await HistoryRepo.save(history);
      resultHolder.push(newCreatedHistory);
    } catch (error) {
      res.status(error.status).send({ message: 'error.message' });
    }
  }
  res.status(200).json({
    msg: 'successful',
    data: resultHolder,
  });
};

export const getAllHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const appRepo = getRepository(Application);
    const apps = await appRepo.find({ relations: ['history'] });

    const { page } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;

    const pager = Paginate(apps.length, pageNumber, 8);

    const pageApp = apps.slice(pager.startIndex, pager.endIndex + 1);

    res.status(200).json({
      status: 'successful',
      data: pageApp,
      pager,
    });
  } catch (error) {
    next(error);
  }
};
