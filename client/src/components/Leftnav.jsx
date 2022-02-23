import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

const Ul = styled.ul`
  display: flex;
  align-items: center;

  li {
    list-style: none;
    margin-right: 7rem;

    .link {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      text-decoration: none;
      color: #222;
      padding-top: 2rem;
      padding-bottom: 1rem;
      padding-right: 1rem;
      padding-left: 0.3rem;

      &:hover {
      }
    }
    .underline {
      border-bottom: 0.3rem solid #62bbe4;
    }

    .nav-label {
      margin-left: 0.4rem;
    }
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 200px;
    padding: 3.5rem;
    transform: ${({ open }) => (open ? 'translateX(0%)' : 'translateX(-100%)')};
    opacity: ${({ open }) => (open ? '0.8' : '0')};
    transition: transform 0.6s ease-in-out;
    z-index: 30;

    .link {
      color: #fff;
      margin-top: 2rem;
    }
  }
`;

const Leftnav = ({open}) => {
    return (
        <Ul open={open}>
            <li>
              <NavLink to="/home" className="link" activeClassName="underline">
                <img src="./Home.svg" alt="home logo" />
                <span className="nav-label">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/server"
                className="link"
                activeClassName="underline"
              >
                <img src="./Server.svg" alt="" />
                <span className="nav-label">Server</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/application"
                className="link"
                activeClassName="underline"
              >
                <img src="./Application.svg" alt="application logo" />
                <span className="nav-label">Application</span>
              </NavLink>
            </li>
        </Ul>
    );
}

export default Leftnav
