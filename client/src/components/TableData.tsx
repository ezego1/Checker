import React from 'react';
import ToggleStyle from './Toggle';
import * as FaIcons from 'react-icons/fa';
import * as GoIcons from 'react-icons/go';

 interface historyObj {
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


const TableData = ({ toggle, data }: { toggle: any, data: historyObj[] }) => {
  return (
    <>
      {data &&
        data.map((item, index) => (
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
            <td>
              <span className="color-span">{item.serverMapped}</span>
            </td>
            <td>{new Date(item.dateScan).toLocaleString()}</td>
            <td>
              {item.isUp ? (
                <FaIcons.FaCheckCircle size={18} color={'green'} />
              ) : (
                <img src="/triangle.svg" alt="warning" />
              )}
            </td>
            <td>
              <button className="btn-action" onClick={() => toggle.openViewModal(item.id)}>
                VIEW RESULT
              </button>
            </td>
            <td>
              <ToggleStyle isActive={false} onClick={toggle.toggleStatus}>
                <FaIcons.FaEllipsisV />
              </ToggleStyle>
            </td>
          </tr>
        ))}
    </>
  );
};


export default TableData;