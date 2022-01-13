import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
/*Form State Switch Case*/
const HANDLE_INPUT_STATE = 'HANDLE_INPUT_STATE'
const RESET_STATE = 'RESET_STATE';
const VALIDATE_INPUT = 'VALIDATE_INPUT';
const initialState = {
    SLF_username: {
        value: '',
        error: false,
        touched: false
    },
    SLF_password: {
        value: '',
        error: false,
        touched: false
    },
    errors: false
}
export const formReducer = (state, action) => {
    switch (action.type) {
        case HANDLE_INPUT_STATE:
            return {
                ...state, [action.field]: { value: action.payload, touched: true, error: !action.payload && state.errors ? true : false }
            }
        case RESET_STATE:
            return initialState;
        case VALIDATE_INPUT:
            return {
                ...state,
                SLF_username: { ...state.SLF_username, error: !state.SLF_username.value ? true : false },
                SLF_password: { ...state.SLF_password, error: !state.SLF_password.value ? true : false },
                errors: true
            }

        default:
            return state;
    }
}
/*Form Title */
const Title = ({ title = 'Login Form', className = 'SLF_title', element = 'h1' }) => {
    const TagName = `${element}`;
    return <TagName className={className}>{title}</TagName>;
}
/*Form Inout Field */
const Input = ({ type = 'text', name = '', id = '', className = 'SLF_input', ...props }) => {

    return <input type={type} name={name} id={id} className={className} {...props} />

}
/*Form Submit button */
const Button = ({ label, className }) => {
    return <button className={className} type='submit'>{label}</button>
}

const SimpleLoginForm = ({
    title = "Login Form",
    buttonLabel = "Submit",
    usernameLabel = "Username",
    passwordLabel = 'Password',
    usernameErrorMessage = "Username is required",
    passwordErrorMessage = 'Passowrd is required',
    formWrapperClasses = 'SLF_wrapper',
    inputClasses = 'SLF_input',
    labelClasses = 'SLF_label',
    buttonClasses = 'SLF_button'
}) => {
    const [formState, dispatch] = useReducer(formReducer, initialState)
    const handelChange = (e) => {
        dispatch({ type: HANDLE_INPUT_STATE, field: e.target.name, payload: e.target.value })
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        if (formState.SLF_username.value && formState.SLF_password.value) {
            dispatch({ type: RESET_STATE })
        } else {
            dispatch({ type: VALIDATE_INPUT })
        }
    }
    return <div className={formWrapperClasses}>
        <Title title={title} />
        <form onSubmit={handelSubmit}>
            <label className={labelClasses}>{usernameLabel}</label><Input id="SLF_username" name="SLF_username" type="text" className={inputClasses} value={formState['SLF_username'].value} onChange={(e) => { handelChange(e) }} />
            {formState['SLF_username'].error && <span>{usernameErrorMessage}</span>}
            <label className={labelClasses}>{passwordLabel}</label><Input id="SLF_password" name="SLF_password" type="password" className={inputClasses} value={formState['SLF_password'].value} onChange={(e) => { handelChange(e) }} />
            {formState['SLF_password'].error && <span>{passwordErrorMessage}</span>}
            <Button className={buttonClasses} label={buttonLabel} />
        </form>
    </div >
}

SimpleLoginForm.propTypes = {
    title: PropTypes.string,
    buttonLabel: PropTypes.string,
    usernameLabel: PropTypes.string,
    passwordLabel: PropTypes.string,
    usernameErrorMessage: PropTypes.string,
    passwordErrorMessage: PropTypes.string,
    formWrapperClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    labelClasses: PropTypes.string,
    buttonClasses: PropTypes.string,
}
export default SimpleLoginForm;