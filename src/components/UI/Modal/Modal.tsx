import React, { Component} from 'react';
import './Modal.css'
import { Backdrop } from '../Backdrop/Backdrop';

type Props = {
    show: boolean,
    modalClosed: boolean,
    children: any
}

type State = {

}

class Modal extends Component <Props, State> {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render () {
     
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className='Modal' >
           {this.props.children}
        </div>
      </React.Fragment>
     );

  }
   
}

export default Modal;