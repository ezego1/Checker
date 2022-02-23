import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Main } from './style';
import { AppContext } from '../../store';
import Modal from '../../components/modal/Modal';
import { ModalContainer } from './style';
import * as FaIcons from 'react-icons/fa';
import Logo from '../../components/Logo';
import Toggle from '../../components/Toggle';
import * as GoIcons from 'react-icons/go';
import smartApi from '../../store/smart-check.api';
import { Sdata } from '../../store';

const Server = () => {
  const {
    handleClose,
    handleOpen,
    modalOpen,
    setNewServerData,
    updateServerDb,
    isActiveServerSwitch,
    serverData,
    serverPage,
    handleServerPage,
  } = useContext(AppContext);

  const [openEdit, setOpenEdit] = useState(false);
  const [updateItem, setUpdateItem] = useState({
    serverName: '',
    serverIp: '',
    cpu: '',
    memory: '',
    storage: '',
    id: '',
  });
  const [server, setServer] = useState({
    serverName: '',
    serverIp: '',
    cpu: '',
    memory: '',
    storage: '',
  });

  const [filter, setFilter] = useState('Active Status');
  const [search, setSearch] = useState('');

  const createServer = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('I was called');
    const { serverName, serverIp, cpu, memory, storage } = server;

    if (
      serverName === '' ||
      serverIp === '' ||
      cpu === '' ||
      memory === '' ||
      storage === ''
    ) {
      return;
    }

    await smartApi.post('/server', server);
    const newServer = await smartApi.get('/server');

    setNewServerData!(newServer.data.data);

    setServer({
      serverName: '',
      serverIp: '',
      cpu: '',
      memory: '',
      storage: '',
    });
    if (handleClose) {
      handleClose();
    }
  };

  const updateServer = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { serverName, serverIp, cpu, memory, storage, id } = updateItem;

    if (
      serverName === '' ||
      serverIp === '' ||
      cpu === '' ||
      memory === '' ||
      storage === ''
    ) {
      return;
    }

    const updatedServer = await smartApi.put(`/server/${id}`, updateItem);

    if (updateServerDb) {
      updateServerDb(updatedServer.data.data);
    }

    setUpdateItem({
      serverName: '',
      serverIp: '',
      cpu: '',
      memory: '',
      storage: '',
      id: '',
    });

    setOpenEdit(!openEdit);
  };

  const toggleStatus = async (id: string) => {
    const data = serverData!.map((item: Sdata) => {
      if (item.id === id) {
        item.isActive = !item.isActive;
      }
      return item;
    });

    if (isActiveServerSwitch) {
      isActiveServerSwitch(data);
    }

    const updated = await smartApi.patch(`/server/${id}`);
    
    console.log(updated.data.data.isActive);
  };

  const handleEdit = (
    item: React.SetStateAction<{
      id: string;
      serverName: string;
      serverIp: string;
      cpu: string;
      memory: string;
      storage: string;
    }>,
  ) => {
    setUpdateItem(item);
    setOpenEdit(!openEdit);
  };

  const handleServerInput = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setServer((state) => ({ ...state, [name]: value }));
  };

  const handleSeverEdit = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setUpdateItem({ ...updateItem, [name]: value });
  };

  const serverFinder = (event: any) => {
    if (event.charCode === 13) {
      setSearch(event.target.value);
    }
  };

  const changePage = async (item: number) => {
    const reply = await await smartApi.get(`/server?page=${item}`);
    setNewServerData!(reply.data.data);
    handleServerPage!(reply.data.pager);
  };

  useEffect(() => {
    if (filter === 'true' || filter === 'false') {
      const findSelected = async () => {
        const result = await smartApi.get(`/server/active?isActive=${filter}`);
        setNewServerData!(result.data.data);
        handleServerPage!(result.data.pager);
      };
      findSelected();
     
    } else {
      const findAll = async () => {
        const result = await smartApi.get('/server');
        setNewServerData!(result.data.data);
        handleServerPage!(result.data.pager);
      };
 
      findAll();
    }
  }, [filter]);

  useEffect(() => {
    const findAll = async () => {
      const result = await smartApi.get(`/server/${search}`);
      setNewServerData!(result.data.data);
      handleServerPage!(result.data.pager);
    };

    findAll();
  }, [search])

  return (
    <div>
      <Logo />
      <Navbar />
      <Main>
        <Modal
          control={{ modalOpen, handleClose }}
          label="Create"
          update={updateServer}
          submit={createServer}
        >
          <div>
            <ModalContainer>
              <h1>Create a server</h1>
              <div className="modal-form">
                <p>Enter Server Details</p>
                <div className="form-group">
                  <label htmlFor="serverName">Server Name</label>
                  <input
                    type="text"
                    name="serverName"
                    onChange={handleServerInput}
                    value={server.serverName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="serverIp">Server IP</label>
                  <input
                    type="text"
                    name="serverIp"
                    onChange={handleServerInput}
                    value={server.serverIp}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpu">CPU</label>
                  <input
                    type="text"
                    name="cpu"
                    onChange={handleServerInput}
                    value={server.cpu}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="memory">Memory</label>
                  <input
                    type="text"
                    name="memory"
                    onChange={handleServerInput}
                    value={server.memory}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="storage">Storage</label>
                  <input
                    type="text"
                    name="storage"
                    onChange={handleServerInput}
                    value={server.storage}
                  />
                </div>
              </div>
            </ModalContainer>
          </div>
        </Modal>
        <Modal
          control={{
            modalOpen: openEdit,
            handleOpen: handleEdit,
            handleClose: handleEdit,
          }}
          label="Update"
          submit={createServer}
          update={updateServer}
        >
          <div>
            <ModalContainer>
              <h1>Edit server</h1>
              <div className="modal-form">
                <p>Enter Server Details</p>
                <div className="form-group">
                  <label htmlFor="serverName">Server Name</label>
                  <input
                    type="text"
                    name="serverName"
                    onChange={handleSeverEdit}
                    value={updateItem.serverName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="serverIp">Server IP</label>
                  <input
                    type="text"
                    name="serverIp"
                    onChange={handleSeverEdit}
                    value={updateItem.serverIp}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpu">CPU</label>
                  <input
                    type="text"
                    name="cpu"
                    onChange={handleSeverEdit}
                    value={updateItem.cpu}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="memory">Memory</label>
                  <input
                    type="text"
                    name="memory"
                    onChange={handleSeverEdit}
                    value={updateItem.memory}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="storage">Storage</label>
                  <input
                    type="text"
                    name="storage"
                    onChange={handleSeverEdit}
                    value={updateItem.storage}
                  />
                </div>
              </div>
            </ModalContainer>
          </div>
        </Modal>
        <div className="filter-row">
          <div className="filter-search-input">
            <Input seeker={serverFinder} />
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
          <Button click={handleOpen}>Create Server</Button>
        </div>
        <div className="Display-inner-container">
          <div className="Display-print">
            <img src="./PDF.svg" alt="pdf" />
            <img src="./xls.svg" alt="xls" />
            <span>
              Showing {serverData?.length} 0f {serverPage?.totalItems} Entries
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Status</th>
                <th>SERVER NAME</th>
                <th>IP ADDRESS</th>
                <th>CPU(%)</th>
                <th>MEMORY(%)</th>
                <th>STORAGE(%)</th>
                <th>ACTION</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {serverData &&
                serverData.map((item: Sdata, index: number) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item.isActive ? (
                            <GoIcons.GoPrimitiveDot
                              size={22}
                              color={'#24c977'}
                            />
                          ) : (
                            <GoIcons.GoPrimitiveDot
                              size={22}
                              color={'#ff4343f7'}
                            />
                          )}
                        </td>
                        <td>{item.serverName}</td>
                        <td>{item.serverIp}</td>
                        <td>{item.cpu}</td>
                        <td>{item.memory}</td>
                        <td>{item.storage}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(item)}
                          >
                            EDIT
                          </button>
                        </td>
                        <td>
                          <Toggle
                            isActive={item.isActive}
                            onClick={() => toggleStatus(item.id)}
                          >
                            <FaIcons.FaEllipsisV />
                          </Toggle>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="footer">
            {serverPage?.pages && serverPage?.pages.length > 0 && (
              <ul className="pagination-list">
                <li>
                  <button
                    onClick={() => changePage(serverPage?.currentPage - 1)}
                    disabled={serverPage?.currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {serverPage?.pages.map((item) => (
                  <li key={item}>
                    <button onClick={() => changePage(item)}>{item}</button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => changePage(serverPage?.currentPage + 1)}
                    disabled={serverPage.currentPage === serverPage.totalPages}
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

export default Server;
