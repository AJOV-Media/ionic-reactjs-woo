import React, { FunctionComponent } from 'react';
import './Spinner.css'

type SpinnerProps = {
    message: string,
}

export const Spinner: FunctionComponent<SpinnerProps> = ({message}) => <div className='Loader'> { message } </div>