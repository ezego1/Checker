import React, { useContext, useState, useEffect } from 'react';
import { Nav } from './component.style';
import { AppContext } from '../store';
import Modal from './modal/Modal';
import ResultModal from './modal/ResultModal';
import HomeModal from '../views/home/style';
import SmartApi from '../store/smart-check.api'
import { Sdata } from '../store/index'
import Burger from './Burger';
import * as FaIcons from 'react-icons/fa';

interface Iresult {
  status: string;
  serverMapped: string;
  dateScan: string;
  url: string;
  isUp: boolean;
}

const Navbar = (props: any) => {
  const {
    homeModal,
    homeModalToggle,
    serverData,
    applicationData,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectAllServerChecked, setAllServerChecked] = useState(false);
  const [selectedServerChecked, setServerChecked] = useState<string[]>([]);
  const [selectAllApplicationChecked, setAllAppChecked] = useState(false);
  const [selectedApplicationChecked, setApplicationChecked] = useState<string[]>([]);
  const [result, setResult] = useState<Iresult[]>([])

  const [mappedServers , setMappedServers] = useState<Sdata[]>([])




  useEffect(() => {
    if  (selectedServerChecked.length > 0 && selectedServerChecked.length === mappedServers!.length) {
      setAllServerChecked(true);
    } else {
      setAllServerChecked(false);
    }
  }, [selectedServerChecked, mappedServers]);


  useEffect(() => {
    if (selectedApplicationChecked.length === applicationData!.length) {
      setAllAppChecked(true);
    } else {
      setAllAppChecked(false);
    }
    setServerChecked([])
  }, [selectedApplicationChecked, applicationData]);

  const handleServerSelect = (id: string) => {
    let newServerList = [];
    if (selectedServerChecked.includes(id)) {
      newServerList = selectedServerChecked.filter((serverId) => serverId !== id);
    } else {
      newServerList = [...selectedServerChecked, id];
    }

    setServerChecked(newServerList);
  };

  const handleApplicationSelect = (id: string) => {
    let newApplicationList = [];
    if (selectedApplicationChecked.includes(id)) {
      newApplicationList = selectedApplicationChecked.filter((serverId) => serverId !== id);
    } else {
      newApplicationList = [...selectedApplicationChecked, id];
    }

    setApplicationChecked(newApplicationList);
  };

  const handleSelectAllServer = (e: { target: { checked: any } }) => {
    const checkSelected = e.target.checked;
    if (checkSelected) {
      setServerChecked(mappedServers!.map((server) => server.id));
    } else {
      setServerChecked([]);
    }
    setAllServerChecked(checkSelected);
  };


  const handleSelectAllApp = (e: { target: { checked: any } }) => {
    const checkSelected = e.target.checked;
    if (checkSelected) {
      console.log(serverData);
      setApplicationChecked(applicationData!.map((server) => server.id));
    } else {
      setApplicationChecked([]);
    }
    setAllAppChecked(checkSelected);
  };

  const conductCheck = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (selectedApplicationChecked.length < 1) {
      return;
    }
    const appToCheck = applicationData?.filter(
      (app) => app.id === selectedApplicationChecked[0],
    );
    
    const body = {
      appName: appToCheck![0].applicationName,
      appId: appToCheck![0].id,
      appPort: appToCheck![0].applicationPort,
      appEndPoint: appToCheck![0].endPoint,
      mappedServers: mappedServers.length,
      serversId: selectedServerChecked,
    };
    try {
      const checkResult = await SmartApi.post('/application/smart', body)
      setResult(checkResult.data.data); 
    } catch (error) {
      console.log(error.message)
    }
  
    homeModalToggle!();
    setMappedServers([]);
    setApplicationChecked([]);

    setIsOpen((prevState) => !prevState);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchMappedServers = async () => {
      const mapped = await SmartApi.get(`/application/${selectedApplicationChecked[0]}`);
      setMappedServers(mapped.data.data.servers);
    }
    if (selectedApplicationChecked.length === 1) {
      fetchMappedServers();
    } else {
      setMappedServers([])
    }

  }, [selectedApplicationChecked])

  let activeApplication = applicationData.filter(item => item.isActive === true)

  return (
    <Nav>
      <Burger />
      <div className="button-div">
        <button onClick={homeModalToggle}>Check Health Status</button>
      </div>
      <Modal
        control={{ modalOpen: homeModal, handleClose: homeModalToggle }}
        label="Check Health Status"
        submit={conductCheck}
        update={undefined}
      >
        <div>
          <HomeModal>
            <h1>Conduct Health Check</h1>
            <div className="conduct">
              <p>Applications</p>
              <div>
                {/* <input
                  checked={selectAllApplicationChecked}
                  type="checkbox"
                  name="allApplications"
                  onChange={handleSelectAllApp}
                />
                <label htmlFor="allApplications">All Applications</label> */}
                <p className="label-text">Select Application</p>
                <div className="home-check-container">
                  {activeApplication &&
                    activeApplication.map((item, index) => (
                      <div className="list" key={index}>
                        <input
                          type="checkbox"
                          checked={selectedApplicationChecked.includes(item.id)}
                          onChange={() => handleApplicationSelect(item.id)}
                        />
                        <label htmlFor="">{item.applicationName}</label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="conduct">
              <p>Server</p>
              <div>
                <input
                  type="checkbox"
                  name="allServer"
                  checked={selectAllServerChecked}
                  onChange={handleSelectAllServer}
                />
                <label htmlFor="allServer">All Server</label>
                <p className="label-text">Select Server</p>
                <div className="home-check-container">
                  {mappedServers &&
                    mappedServers.map((item, index) => (
                      <div className="list" key={index}>
                        <input
                          type="checkbox"
                          checked={selectedServerChecked.includes(item.id)}
                          onChange={() => handleServerSelect(item.id)}
                        />
                        <label htmlFor="">{item.serverName}</label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </HomeModal>
        </div>
      </Modal>
      <ResultModal control={{ isOpen, handleToggle }}>
        <div>
          <HomeModal>
            <h1 className="h1text">Health Check Result</h1>

            <div className="conduct-result">
              
              {result &&
                result.map((item, index) => (
                  <div className="conduct-result-each" key={index}>
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
                      <span>Date:</span>
                      {new Date(item.dateScan).toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          </HomeModal>
        </div>
      </ResultModal>
    </Nav>
  );
};

export default Navbar;
