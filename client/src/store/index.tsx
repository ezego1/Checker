import React, { useState, useEffect } from 'react';
import smartApi from './smart-check.api';

export interface Sdata {
  isActive: boolean;
  id: string;
  serverName: string;
  serverIp: string;
  cpu: string;
  memory: string;
  storage: string;
}

export interface Adata {
  isActive: boolean;
  id: string;
  applicationName: string;
  applicationType: string;
  applicationDescription: string;
  applicationPort: string;
  endPoint: string;
}

interface AppContextInterface {
  modalOpen: boolean;
  serverData: Sdata[];
  handleOpen: () => void;
  handleClose: () => void;
  isActiveServerSwitch: (a: Sdata[]) => void;
  updateServerDb: (a: Sdata) => void;
  setNewServerData: (a: Sdata[]) => void;
  applicationData: Adata[];
  isActiveApplicationSwitch: (a: Adata[]) => void;
  updateApplicationDb: (a: Adata) => void;
  setNewApplicationData: (a: Adata[]) => void;
  homeModal: boolean;
  homeModalToggle: () => void;
  historyData: IAppRelation[];
  handleServerPage: (a: Ipager) => void;
  serverPage: Ipager;
  handleApplicationPage: (a: Ipager) => void;
  applicationPage: Ipager;
  handleHistoryPage: (a: Ipager) => void;
  historyPage: Ipager;
  setNewHistoryData: (a: IAppRelation[]) => void;
  totalHistory: number;
}

export interface Ipager {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

export interface IHistory {
  id: string;
  serverMapped: string;
  isUp: boolean;
  dateScan: string;
  status: string;
  createdAt: string;
  url: string;
}

export interface IAppRelation {
  isActive: boolean;
  id: string;
  applicationName: string;
  applicationType: string;
  applicationDescription: string;
  applicationPort: string;
  history: IHistory[]
  endPoint: string;
} 
  
  
const AppContext = React.createContext<Partial<AppContextInterface>>({});

const AppContextProvider = (props: { children: React.ReactNode }) => {
  const [serverData, setServerData] = useState<Sdata[]>([]);
  const [serverPage, setServerPage] = useState<Ipager>();

  const [applicationData, setApplicationData] = useState<Adata[]>([]);
  const [applicationPage, setApplicationPage] = useState<Ipager>();

  const [historyData, setHistoryData] = useState<IAppRelation[]>([]);
  const [historyPage, setHistoryPage] = useState<Ipager>();

  const [modalOpen, setModalOpen] = useState(false);
  const [homeModal, setHomeModal] = useState(false);

  const [totalHistory, setTotalHistory] = useState(0)


  useEffect(() => {
    const backEndData = async () => {
      const data = await smartApi.get('/server');
      setServerData(data.data.data);
      setServerPage(data.data.pager);

      const data2 = await smartApi.get('/application');
      setApplicationData(data2.data.data);
      setApplicationPage(data2.data.pager);

      const result = await smartApi.get(`/application/history`);
      setHistoryData(result.data.data);
      setHistoryPage(result.data.pager);

      const history = await smartApi.get(`/history`);
      setTotalHistory(history.data.total);
    };

    backEndData();
  }, []);

  const setNewServerData = (newServerData: Sdata[]) => {
    setServerData(newServerData);
  };

  const isActiveServerSwitch = (array: Sdata[]) => {
    setServerData([...array]);
  };

  const handleServerPage = (val: Ipager) => {
    setServerPage(val);
  };
  const updateServerDb = (obj: Sdata) => {
    let newDB = serverData.map((item) => {
      return item.id === obj.id ? obj : item;
    });

    setServerData(newDB);
  };

  const setNewApplicationData = (newApplicationData: Adata[]) => {
    setApplicationData(newApplicationData);
  };

  const isActiveApplicationSwitch = (array: Adata[]) => {
    setApplicationData([...array]);
  };

  const updateApplicationDb = (obj: Adata) => {
    let newDB = applicationData.map((item) => {
      return item.id === obj.id ? obj : item;
    });

    setApplicationData(newDB);
  };

  const handleApplicationPage = (val: Ipager) => {
    setApplicationPage(val);
  };

  const setNewHistoryData = (newHistoryData: IAppRelation[]) => {
    setHistoryData(newHistoryData);
  };

   const handleHistoryPage = (val: Ipager) => {
     setHistoryPage(val);
   };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const homeModalToggle = () => {
    setHomeModal(!homeModal);
  };

  return (
    <AppContext.Provider
      value={{
        modalOpen,
        handleOpen,
        handleClose,
        serverData,
        isActiveServerSwitch,
        updateServerDb,
        setNewServerData,
        handleServerPage,
        serverPage,
        applicationData,
        isActiveApplicationSwitch,
        updateApplicationDb,
        setNewApplicationData,
        applicationPage,
        handleApplicationPage,
        historyData,
        historyPage,
        setNewHistoryData,
        handleHistoryPage,
        homeModalToggle,
        homeModal,
        totalHistory
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
