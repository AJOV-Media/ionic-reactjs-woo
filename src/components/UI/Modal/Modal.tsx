import React, { FunctionComponent } from 'react';
import './Modal.css'

type ModalProps = {
    message: string,
}

export const Modal: FunctionComponent<ModalProps> = ({message}) => {
    return (
      <React.Fragment>
        <div className='Modal' >
               
        </div>
      </React.Fragment>
     );
}