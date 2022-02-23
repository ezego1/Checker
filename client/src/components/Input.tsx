import React from 'react'
import * as FaIcons from "react-icons/fa" 
import {IconContext} from "react-icons"
import { InputStyle } from "./component.style"

const Input = (props: { seeker: any}) => {
    return (
      <IconContext.Provider value={{className: "search-icon"}}>
        <InputStyle>
          <FaIcons.FaSearch />
          <input
            className="search-input"
            type="text"
            placeholder="Enter a search keyword"
            onKeyPress={ props.seeker}
          />
        </InputStyle>
      </IconContext.Provider>
    );
}

export default Input;