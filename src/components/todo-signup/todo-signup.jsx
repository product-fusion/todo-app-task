import * as React from 'react';
import './todo-signup.scss';
import SignUp from '../../api/signup.api';

export const TodoSignUp = (props) => {
    const [data, setData] = React.useState({
       email: '',
       password: '',
       repassword: '',
    });
    const [errorMessage, setErrorMessage] = React.useState('');
    const handleOnChange = (value, name) => {
        setData((prevData) => ({
          ...prevData,
          [name]: value?.trim(),
        }));
    };
    const handleLogin = async () => {
      setErrorMessage('');
        if ((data?.password)?.trim() === (data?.repassword)?.trim()) {
          const createUser = await SignUp?.signup(data?.email, data?.password);
          if (createUser?.output === 200) {
            props?.onSignIn();
          } else {
            setErrorMessage('*Something Went Wrong please try again');
          }
        } else {
            setErrorMessage('*Password does not match');
        }
    };

  return (
    <div className="todo-signupcard">
      <div>
        <p className="todo-title">
          Sign Up
        </p>
      </div>
      <form onSubmit={(e) => { handleLogin(); e?.preventDefault(); }}>
        <div className="signup-input">
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input-bg"
            placeholder="Enter your user email..."
            onChange={(e) => handleOnChange(e?.target?.value, 'email')}
          />
        </div>
        <div className="signup-input">
          <input
            type="password"
            id="password"
            name="password"
            required
            className="input-bg"
            placeholder="Enter your password..."
            onChange={(e) => handleOnChange(e?.target?.value, 'password')}
          />
        </div>
        <div className="signup-input">
          <input
            type="password"
            id="repassword"
            name="repassword"
            required
            className="input-bg"
            placeholder="Re Enter your password..."
            onChange={(e) => handleOnChange(e?.target?.value, 'repassword')}
          />
        </div>
        {
            (errorMessage)?.trim()?.length > 0 && (
            <span className="signup-error">
              {errorMessage}
            </span>
        )
        }
        <div className="signup-btn">
          <button type="button" className="signup-cancel" onClick={() => props?.onSignIn()}>
            Cancel
          </button>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
