import React, {useState} from 'react';
import classes from './CheckOut.module.css'

const valueIsValid = (value => value.trim().length !== 0)
const valueIsFiveChar = (value => value.trim().length === 5)
const CheckOut = (props) => {
    const [input, setInput] = useState({name: '', street: '', postalCode: '', city: ''})
    const [inputTouched, setInputTouched] = useState({name: false, street: false, postalCode: false, city: false})

    const nameIsValid = valueIsValid(input.name)
    const nameIsInValid = !nameIsValid && inputTouched.name

    const streetIsValid = valueIsValid(input.street)
    const streetIsInValid = !streetIsValid && inputTouched.street

    const postalCodeIsValid = valueIsFiveChar(input.postalCode)
    const postalCodeIsInValid = !postalCodeIsValid && inputTouched.postalCode

    const cityIsValid = valueIsValid(input.city)
    const cityIsInValid = !cityIsValid && inputTouched.city

    let formIsValid = false;
    if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
        formIsValid = true
    }
    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const handleBlur = (e) => {
        setInputTouched({...inputTouched, [e.target.name]: true})
    }
    const confirmHandler = (e) => {
        e.preventDefault()
        setInputTouched({name: true, street: true, postalCode: true, city: true})
        if (!formIsValid) {
            return;
        }
        props.onConfirm({name:input.name,street:input.street,postalCode:input.postalCode,city:input.city})
        setInputTouched({name: false, street: false, postalCode: false, city: false})
        setInput({name: '', street: '', postalCode: '', city: ''})

    }
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${nameIsInValid ?classes.invalid:''}`}>
                <label htmlFor='name'>Your name</label>
                <input value={input.name} name={'name'} onChange={handleChange} onBlur={handleBlur} type='text'
                       id='name'/>
                {nameIsInValid && <p>*please enter a valid input </p>}
            </div>
            <div className={`${classes.control} ${streetIsInValid ?classes.invalid:''}`}>
                <label htmlFor='street'>Street</label>
                <input value={input.street} name={'street'} onChange={handleChange} onBlur={handleBlur} type='text'
                       id='street'/>
                {streetIsInValid && <p>*please enter a valid input </p>}
            </div>
            <div className={`${classes.control} ${postalCodeIsInValid ?classes.invalid:''}`}>
                <label htmlFor='postalCode'>Postal cod</label>
                <input value={input.postalCode} name={'postalCode'} onChange={handleChange} onBlur={handleBlur}
                       type='text' id='postalCode'/>
                {postalCodeIsInValid && <p>*please enter a valid input</p>}
            </div>
            <div className={`${classes.control} ${cityIsInValid ?classes.invalid:''}`}>
                <label htmlFor='city'>City</label>
                <input value={input.city} name={'city'} onChange={handleChange} onBlur={handleBlur} type='text'
                       id='city'/>
                {cityIsInValid && <p>*please enter a valid input </p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button disabled={!formIsValid} className={classes.submit}>Confirm</button>
            </div>

        </form>
    );
};

export default CheckOut;