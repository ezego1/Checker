import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import { Main } from './style';
import { AppContext } from '../../store';
import { Dashboard, FilterStyle } from './style';
import Logo from '../../components/Logo';
import TableData from '../../components/TableData';
import SmartApi from '../../store/smart-check.api';
import ViewModal from '../../components/modal/ViewModal';
import * as FaIcons from 'react-icons/fa';

export interface historyObj {
  id: string;
  applicationName: string;
  isActive: boolean;
  createdAt: string;
  dateScan: string;
  isUp: boolean;
  serverMapped: string;
  status: string;
  url: string;
}

const Home = () => {
  const {
    serverData,
    applicationData,
    historyPage,
    handleHistoryPage,
    setNewHistoryData,
    historyData,
    totalHistory,
  } = useContext(AppContext);

  const [filterSelectApp, setFilterSelectApp] = useState('All Applications');
  const [filterSelectServer, setFilterSelectServer] = useState('All Servers');
  const [filterHealthStatus, setFilterHealthStatus] = useState('All Status');
  const [nameSearch, setNameSearch] = useState('');
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [view, setView] = useState<historyObj[]>([])

  const active = serverData?.filter((item) => item.isActive === true).length;
  const inactive = serverData?.filter((item) => item.isActive === false).length;
  const available = applicationData?.filter((item) => item.isActive === true)
    .length;
  const critical = applicationData?.filter((item) => item.isActive === false)
    .length;

  const handleSearch = (event: any) => {
    if (event.charCode === 13) {
      setNameSearch(event.target.value);
    }
  };

  useEffect(() => {
    const lookUpName = async () => {
      if (nameSearch === '') {
        return;
      }
      const data = await SmartApi.get('/');
      setNewHistoryData!(data.data.data);
      handleHistoryPage!(data.data.pager);
    };
    lookUpName()
  }, [nameSearch]);

  useEffect(() => {
    const filterByAppId = async () => {
      if (filterSelectApp === 'All Applications') return;
      const data = await SmartApi.get(`/history/${filterSelectApp}`);
      setNewHistoryData!(data.data.data);
      handleHistoryPage!(data.data.pager);
    };
    filterByAppId()
  }, [filterSelectApp]);

  useEffect(() => {
    const filterByServerId = async () => {
      if (filterSelectServer === 'All Servers') return;
      const data = await SmartApi.get(`/history/${filterSelectServer}`);
      setNewHistoryData!(data.data.data);
      handleHistoryPage!(data.data.pager);
    };
    filterByServerId()
  }, [filterSelectServer]);

  const toggleStatus = () => {
    alert('I was clicked');
  };

  const changePage = async (item: number) => {
    const reply = await await SmartApi.get(`/history?page=${item}`);
    setNewHistoryData!(reply.data.data);
    handleHistoryPage!(reply.data.pager);
  };

 
  const allHistory: historyObj[] = [];

  historyData?.forEach((element) => {
    let eachHistory = {} as historyObj;
    let appName = element.applicationName;
    let ofAndOn = element.isActive;
    element.history.forEach((item) => {
      eachHistory.id = item.id;
      eachHistory.isActive = ofAndOn;
      eachHistory.applicationName = appName;
      eachHistory.createdAt = item.createdAt;
      eachHistory.dateScan = item.dateScan;
      eachHistory.isUp = item.isUp;
      eachHistory.serverMapped = item.serverMapped;
      eachHistory.status = item.status;
      eachHistory.url = item.url;
      let newObj = JSON.parse(JSON.stringify(eachHistory))
      allHistory.push(newObj);
    });
  });

  

  const openViewModal = (id) => {
     setIsViewOpen(true);
    const result = allHistory.filter(item => item.id === id)
    setView(result)
   };
  const closeViewModal = () => {
    setIsViewOpen(false);
  };

  return (
    <div>
      <Logo />
      <Navbar />
      <Dashboard>
        <div className="activity-display">
          <p>Application Status</p>
          <div className="activity-inner">
            <div>
              <div className="activity-inner-circle">
                {applicationData?.length}
              </div>
              <p className="all">All</p>
            </div>
            <div>
              <div className="activity-inner-circle leaf">{available}</div>
              <p>Available</p>
            </div>
            <div>
              <div className="activity-inner-circle blood">{critical}</div>
              <p>Critical</p>
            </div>
          </div>
        </div>
        <div className="activity-display">
          <p>Server</p>
          <div className="activity-inner">
            <div>
              <div className="activity-inner-circle">{serverData?.length}</div>
              <p className="all">All</p>
            </div>
            <div>
              <div className="activity-inner-circle leaf">{active}</div>
              <p>Active</p>
            </div>
            <div>
              <div className="activity-inner-circle inactive">{inactive}</div>
              <p>Inactive</p>
            </div>
          </div>
        </div>
        <div className="activity-display">
          <p>Heath check counts</p>
          <div className="activity-inner">
            <div>
              <div className="activity-inner-number">
                {totalHistory}
              </div>
              <p>Count</p>
            </div>
          </div>
        </div>
      </Dashboard>
      <Main>
        <FilterStyle>
          <Input seeker={handleSearch} />
          <select
            className="filter-home"
            onChange={(event) => setFilterSelectApp(event.target.value)}
            value={filterSelectApp}
          >
            <option value="">All Applications</option>

            {applicationData &&
              applicationData.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.applicationName}
                </option>
              ))}
          </select>
          <select
            className="filter-home"
            onChange={(event) => setFilterSelectServer(event.target.value)}
            value={filterSelectServer}
          >
            <option value="">All Servers</option>
            {serverData &&
              serverData.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.serverName}
                </option>
              ))}
          </select>
          <select
            className="filter-home"
            onChange={(event) => setFilterHealthStatus(event.target.value)}
            value={filterHealthStatus}
          >
            <option value="Status">All Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Critical">Critical</option>
          </select>
        </FilterStyle>
        <div className="Display-inner-container">
          <div className="Display-print">
            <img src="./PDF.svg" alt="pdf" />
            <img src="./xls.svg" alt="xls" />
            <span>
              Showing {historyData?.length} 0f {historyPage?.totalItems}
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>STATUS</th>
                <th>APPLICATION</th>
                <th>SERVER MAPPED</th>
                <th>LAST SCAN DATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <TableData
                toggle={{ toggleStatus, openViewModal }}
                data={allHistory}
              />
            </tbody>
          </table>
          <ViewModal control={{ isViewOpen, closeViewModal }}>
            <div>
              <div className="view-result">
                <h1>Result</h1>

                {view &&
                  view.map((item, index) => (

                    <div className="result-pannel" key={index}>
                      <p>
                        <span>Status: </span>
                        {item.isUp ? (
                          <FaIcons.FaCheckCircle size={18} color={'green'} />
                        ) : (
                          <img src="/triangle.svg" alt="warning" />
                        )}
                      </p>
                      <p>
                        <span>Ping: </span>
                        {item.status}
                      </p>
                      <p>
                        <span>Date: </span>
                        {new Date(item.dateScan).toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </ViewModal>
          <div className="footer">
            {historyPage?.pages && historyPage?.pages.length > 0 && (
              <ul className="pagination-list">
                <li>
                  <button
                    onClick={() => changePage(historyPage?.currentPage - 1)}
                    disabled={historyPage?.currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {historyPage?.pages.map((item) => (
                  <li key={item}>
                    <button onClick={() => changePage(item)}>{item}</button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => changePage(historyPage?.currentPage + 1)}
                    disabled={
                      historyPage.currentPage === historyPage.totalPages
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Home;
