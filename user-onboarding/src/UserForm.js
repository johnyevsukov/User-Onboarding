import React from 'react';

export default function UserForm(props) {
    const {values, change, submit, disabled, errors} = props;

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = (evt) => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
      };

    return (
        <form className='form-container' onSubmit={onSubmit}>
            <div>
                <h2>Add a User:</h2>
                <div className="errors">
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.termsOfService}</div>
                </div>
                <div className="form-inputs">
                    <label>
                        Name:
                        <input
                            value={values.username}
                            onChange={onChange}
                            name="name"
                            type="text"
                            placeholder='Enter your name...'
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            value={values.username}
                            onChange={onChange}
                            name="email"
                            type="text"
                            placeholder='Enter your email...'
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            value={values.username}
                            onChange={onChange}
                            name="password"
                            type="text"
                            placeholder='Enter your password...'
                        />
                    </label>
                    <label>
                        Agree to terms of service
                        <input
                            type='checkbox'
                            name='termsOfService'
                            checked={values.termsOfService}
                            onChange={onChange}
                        />
                    </label>
                    <button disabled={disabled}>submit</button>
                </div>
            </div>
        </form>
    )
}