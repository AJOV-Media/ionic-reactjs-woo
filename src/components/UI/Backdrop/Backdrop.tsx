import React, { FunctionComponent } from 'react';
import './Backdrop.css'

type BackdropProps = {
    show: boolean,
    clicked: any
}

export const Backdrop: FunctionComponent<BackdropProps> = ({show, clicked}) => {
    return (
        show ? <div className='Backdrop' onClick={clicked} ></div> : null 
     );
}