import React, { useState } from 'react'
import styled from "styled-components"

const ToggleStyle = styled.div`
position: relative;
    
  .btn-hover {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 1rem;
    cursor: pointer;
  }
`; 

const Text = styled.p`
    display: ${(props: {isActive: any})=> props.isActive ? "block" : "none"};
    font-size: 1rem;
    position: absolute;
    top: 1rem;
    left: -3rem;
    z-index: 3;
    border: 0.4rem solid #fff;
    background-color: #fff;
    border-radius: 0.3rem;
`;


const Toggle = ({ isActive, onClick, children }: { isActive: any; onClick: any; children: any;}) => {
    const [active, setActive] = useState(false)
    return (
      <ToggleStyle
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <Text isActive={active}>{isActive ? 'Deactivate' : 'Activate'}</Text>
        <button className="btn-hover" onClick={onClick}>
          {children}
        </button>
      </ToggleStyle>
    );
}


export default Toggle;