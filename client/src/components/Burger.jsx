import React, { useState } from 'react';
import styled from 'styled-components';
import Leftnav from './Leftnav';

const BurgerStyle = styled.div`
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: 1.5rem;
  left: 6rem;
  z-index: 500;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    left: 2rem;
  }

  div {
    width: 3rem;
    height: 0.2rem;
    background-color: ${({ open }) => (open ? '#ccc' : '#333')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.35s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      transform: ${({ open }) =>
        open ? 'translateX(-100%)' : 'translateX(0)'};
      opacity: ${({ open }) => (open ? '0' : '1')};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = () => {
    const [open, setOpen] = useState(false)
 
    return (
      <>
        <BurgerStyle open={open} onClick={() => setOpen(!open)}>
          <div></div>
          <div></div>
          <div></div>
        </BurgerStyle>
        <Leftnav open={ open }/>
      </>
    );
};

export default Burger;
