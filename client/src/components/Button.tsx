import React from 'react'
import { ButtonStyle } from "./component.style"


const Button = (props: { click: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined; children: React.ReactNode; }) => {
    return (
        <ButtonStyle>
            <button className="btn" onClick={props.click}>
                {props.children}
            </button>
        </ButtonStyle>
    )
}


export default Button;