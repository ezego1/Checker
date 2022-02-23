import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Main } from './style';
import Modal from '../../components/modal/Modal';
import { AppContext } from '../../store';
import { ApplicationModal } from './style';
import * as FaIcons from 'react-icons/fa';
import Logo from '../../components/Logo';
import ToggleStyle from '../../components/Toggle';
import smartApi from '../../store/smart-check.api';
import * as GoIcons from 'react-icons/go';
import { Adata, Sdata } from '../../store';
import Host from '../../components/modal/Host'

const Application = () => {
  const {
    modalOpen,
    handleClose,
    handleOpen,
    serverData,
    applicationData,
    isActiveApplicationSwitch,
    updateApplicationDb,
    setNewApplicationData,
    applicationPage,
    handleApplicationPage,
  } = useContext(AppContext);

  const [applicationState, setApplicationState] = useState({
    applicationName: '',
    applicationType: '',
    applicationDescription: '',
    applicationPort: '',
    endPoint: '',
  });
  const [mappedSevers, setMappedServers] = useState<Sdata[]>([])
  const [openHost, setOpenHost] = useState(false)
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Active Status');
  const [selectedServers, setSelectedServers] = useState<string[]>([]);
  const [selectAllServerChecked, setChecked] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedApplication, setUpdatedApplication] = useState<Adata>({
    id: '',
    applicationName: '',
    applicationType: '',
    applicationDescription: '',
    applicationPort: '',
    endPoint: '',
    isActive: true,
  });

  useEffect(() => {
    if (
      selectedServers.length > 0 &&
      selectedServers.length === serverData!.length
    ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [selectedServers, serverData]);

  const handleApplicationState = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setApplicationState((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateApplication = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const {
      applicationName,
      applicationType,
      applicationDescription,
      applicationPort,
      endPoint,
      id,
    } = updatedApplication;

    if (
      applicationName === '' ||
      applicationType === '' ||
      applicationDescription === '' ||
      applicationPort === '' ||
      endPoint === '' ||
      selectedServers.length === 0
    ) {
      return;
    }

    const body = {
      ...updatedApplication,
      host: selectedServers,
    };

    const update = await smartApi.put(`/application/${id}`, body);

    if (updateApplicationDb) {
      updateApplicationDb(update.data.data);
    }
    setOpenEdit(!openEdit);
  };

  const handleApplicationEdit = (event: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = event.target;
    setUpdatedApplication({ ...updatedApplication, [name]: value });
  };
  const createApplication = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const {
      applicationName,
      applicationType,
      applicationDescription,
      applicationPort,
      endPoint,
    } = applicationState;

    if (
      applicationName === '' ||
      applicationType === '' ||
      applicationDescription === '' ||
      applicationPort === '' ||
      endPoint === '' ||
      selectedServers.length === 0
    ) {
      return;
    }

    if (selectedServers.length < 1) return;

    let body = {
      ...applicationState,
      host: selectedServers,
    };

    await smartApi.post('/application', body);
    const newApplication = await smartApi.get('/application');
    setNewApplicationData!(newApplication.data.data);

    setApplicationState({
      applicationName: '',
      applicationType: '',
      applicationDescription: '',
      applicationPort: '',
      endPoint: '',
    });

    handleClose!();
  };
  const handleServerSelect = (id: string) => {
    let newServerList = [];
    if (selectedServers.includes(id)) {
      newServerList = selectedServers.filter((serverId) => serverId !== id);
    } else {
      newServerList = [...selectedServers, id];
    }

    setSelectedServers(newServerList);
  };

  const handleSelectAll = (e: { target: { checked: any } }) => {
    const checkSelected = e.target.checked;
    if (checkSelected) {
      setSelectedServers(serverData!.map((server) => server.id));
    } else {
      setSelectedServers([]);
    }
    setChecked(checkSelected);
  };

  const handleEdit = (item: Adata) => {
    setUpdatedApplication(item);
    setOpenEdit(!openEdit);
  };

  const toggleStatus = async (id: string) => {
    const data = applicationData!.map((item) => {
      if (item.id === id) {
        item.isActive = !item.isActive;
      }
      return item;
    });

    isActiveApplicationSwitch!(data);

    const updated = await smartApi.patch(`/application/${id}`);
    console.log(updated.data.data.isActive);
  };

  const changePage = async (item: number) => {
    const reply = await await smartApi.get(`/application?page=${item}`);
    setNewApplicationData!(reply.data.data);
    handleApplicationPage!(reply.data.pager);
  };

  const applicationFinder = (event: any) => {
    if (event.charCode === 13) {
      setSearch(event.target.value);
    }
  };

  useEffect(() => {
    if (filter === 'true' || filter === 'false') {
      const findSelected = async () => {
        const result = await smartApi.get(
          `/application/active?isActive=${filter}`,
        );
        setNewApplicationData!(result.data.data);
        handleApplicationPage!(result.data.pager);
      };
      findSelected();
    } else {
      const findAll = async () => {
        const result = await smartApi.get('/application');
        setNewApplicationData!(result.data.data);
        handleApplicationPage!(result.data.pager);
      };

      findAll();
    }
  }, [filter]);

  const handleOpenHost = async (id: string) => {
    setOpenHost(true);
    const mapped = await smartApi.get(
      `/application/${id}`,
    );
    setMappedServers(mapped.data.data.servers);
  }

   const handleCloseHost = () => {
     setOpenHost(false);
     setMappedServers([]);
   };

  useEffect(() => {
    const findByName = async () => {
      if (search === '') {
        return;
      }
      const result = await smartApi.get(`/application/unique/${search}`);
      setNewApplicationData!(result.data.data);
      handleApplicationPage!(result.data.pager);
    };

    findByName();
  }, [search]);


  return (
    <div>
      <Logo />
      <Navbar />
      <Main>
        <Modal
          control={{ modalOpen, handleClose }}
          label="Create"
          update={updateApplication}
          submit={createApplication}
        >
          <div>
            <ApplicationModal>
              <h1>Define Application</h1>
              <div className="application-form">
                <div className="form-group">
                  <label htmlFor="applicationName">Application Name</label>
                  <input
                    type="text"
                    name="applicationName"
                    onChange={handleApplicationState}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicationType">Application Type</label>
                  <input
                    type="text"
                    name="applicationType"
                    onChange={handleApplicationState}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicationDescription">
                    Application Dcsc
                  </label>
                  <input
                    type="text"
                    name="applicationDescription"
                    onChange={handleApplicationState}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicationPort">Application Port</label>
                  <input
                    type="text"
                    name="applicationPort"
                    onChange={handleApplicationState}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endPoint">End point</label>
                  <input
                    type="text"
                    name="endPoint"
                    onChange={handleApplicationState}
                  />
                </div>
                <div className="form-grid">
                  Host/Server
                  <div className="application-select">
                    <input
                      type="checkbox"
                      name="host"
                      checked={selectAllServerChecked}
                      onChange={handleSelectAll}
                    />
                    <label htmlFor="host" className="label-input">
                      All Server
                    </label>
                    <p>Select Application</p>
                    <div className="application-ip">
                      <ul>
                        {serverData &&
                          serverData.map((item, index) => (
                            <li key={index} className="text">
                              <input
                                type="checkbox"
                                name="ip1"
                                checked={selectedServers.includes(item.id)}
                                onChange={() => handleServerSelect(item.id)}
                              />
                              {item.serverIp}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ApplicationModal>
          </div>
        </Modal>
        <Modal
          control={{
            modalOpen: openEdit,
            handleClose: handleEdit,
          }}
          label="Update"
          update={updateApplication}
          submit={createApplication}
        >
          <div>
            <ApplicationModal>
              <h1>Define Application</h1>
              <div className="application-form">
                <div className="form-group">
                  <label htmlFor="applicationName">Application Name</label>
                  <input
                    type="text"
                    name="applicationName"
                    onChange={handleApplicationEdit}
                    value={updatedApplication.applicationName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicationType">Application Type</label>
                  <input
                    type="text"
                    name="applicationType"
                    onChange={handleApplicationEdit}
                    value={updatedApplication.applicationType}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicationDescription">
                    Application Dcsc
                  </label>
                  <input
                    type="text"
                    name="applicationDescription"
                    onChange={handleApplicationEdit}
                    value={updatedApplication.applicationDescription}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicationPort">Application Port</label>
                  <input
                    type="text"
                    name="applicationPort"
                    onChange={handleApplicationEdit}
                    value={updatedApplication.applicationPort}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endPoint">End point</label>
                  <input
                    type="text"
                    name="endPoint"
                    onChange={handleApplicationEdit}
                    value={updatedApplication.endPoint}
                  />
                </div>
                <div className="form-grid">
                  Host/Server
                  <div className="application-select">
                    <input
                      type="checkbox"
                      name="host"
                      checked={selectAllServerChecked}
                      onChange={handleSelectAll}
                    />
                    <label htmlFor="host" className="label-input">
                      All Server
                    </label>
                    <p>Select Application</p>
                    <div className="application-ip">
                      <ul>
                        {serverData &&
                          serverData.map((item: Sdata, index: number) => (
                            <li key={index} className="text">
                              <input
                                type="checkbox"
                                name="ip1"
                                checked={selectedServers.includes(item.id)}
                                onChange={() => handleServerSelect(item.id)}
                              />
                              {item.serverIp}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ApplicationModal>
          </div>
        </Modal>
        <Host
          control={{
            openHost,
            handleCloseHost,
          }}
        >
          <div>
            <ApplicationModal>
              <div className="host-server">
                <h1>Host/Servers</h1>
                <div className="host-server-list">
                  <table>
                    <thead>
                      <tr>
                        <th>Server Name</th>
                        <th>Server IP</th>
                        <th>Server Port</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mappedSevers && mappedSevers.map((item, index) => (
                        <tr key={index}>
                          <td>{item.serverName}</td>
                          <td>{item.serverIp}</td>
                          <td>{ item.memory}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
                </div>
              </div>
            </ApplicationModal>
          </div>
        </Host>
        <div className="filter-row">
          <div className="filter-search-input">
            <Input seeker={applicationFinder} />
            <select
              className="filter-select"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option disabled value={'Active Status'}>
                Active status
              </option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
              <option value="All">All</option>
            </select>
          </div>
          <Button click={handleOpen}>Add Application</Button>
        </div>
        <div className="Display-inner-container">
          <div className="Display-print">
            <img src="./PDF.svg" alt="pdf" />
            <img src="./xls.svg" alt="xls" />
            <span>
              Showing {applicationData?.length} 0f {applicationPage?.totalItems}
              Entries
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>STATUS</th>
                <th>APPLICATION NAME</th>
                <th>APPLICATION TYPE</th>
                <th>APPLICATION DCSC</th>
                <th>END POINT</th>
                <th>HOST/SERVER</th>
                <th>ACTION</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {applicationData &&
                applicationData.map((item: Adata, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {item.isActive ? (
                        <GoIcons.GoPrimitiveDot size={22} color={'#24c977'} />
                      ) : (
                        <GoIcons.GoPrimitiveDot size={22} color={'#ff4343f7'} />
                      )}
                    </td>
                    <td>{item.applicationName}</td>
                    <td>{item.applicationType}</td>
                    <td>{item.applicationDescription}</td>
                    <td>{item.endPoint}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleOpenHost(item.id)}
                      >
                        View Host
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        EDIT
                      </button>
                    </td>
                    <td>
                      <ToggleStyle
                        isActive={item!.isActive}
                        onClick={() => toggleStatus(item.id)}
                      >
                        <FaIcons.FaEllipsisV />
                      </ToggleStyle>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="footer">
            {applicationPage?.pages && applicationPage?.pages.length > 0 && (
              <ul className="pagination-list">
                <li>
                  <button
                    onClick={() => changePage(applicationPage?.currentPage - 1)}
                    disabled={applicationPage?.currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {applicationPage?.pages.map((item) => (
                  <li key={item}>
                    <button onClick={() => changePage(item)}>{item}</button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => changePage(applicationPage?.currentPage + 1)}
                    disabled={
                      applicationPage.currentPage === applicationPage.totalPages
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

export default Application;
