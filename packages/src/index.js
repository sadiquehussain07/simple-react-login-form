import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import SimpleLoginForm from './SimpleLoginForm';
export const Wrapper = (props) => {
    return (
        <div>{props.children}</div>
    )
}
ReactDOM.render(<React.StrictMode><Wrapper><SimpleLoginForm /></Wrapper></React.StrictMode>, document.querySelector('#root'));