import * as React from 'react';
import './todo-login.scss';
import Login from '../../api/login.api';

export const TodoLogin = (props) => {
    const [data, setData] = React.useState({
       useremail: '',
       password: '',
    });
    const [errorMessage, setErrorMessage] = React.useState(false);

    const handleOnChange = (value, name) => {
        setData((prevData) => ({
          ...prevData,
          [name]: value?.trim(),
        }));
    };
  const handleLogin = async () => {
    setErrorMessage(false);
    const checkLogin = await Login?.checkUser(data?.useremail, data?.password);
    if (checkLogin?.output === 200) {
      props?.onLogin();
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div className="todo-logincard">
      <div>
        <p className="todo-title">
          Todo Application
        </p>
      </div>
      <form onSubmit={(e) => { handleLogin(); e?.preventDefault(); }}>
        <div className="login-input">
          <input
            type="email"
            id="useremail"
            name="useremail"
            required
            className="input-bg"
            placeholder="Enter your user email..."
            onChange={(e) => handleOnChange(e?.target?.value, 'useremail')}
          />
        </div>
        <div className="login-input">
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
        {
            errorMessage && (
            <span className="login-error">
              *Incorrect user name or password
            </span>
        )
        }
        <div className="login-btn">
          <button type="submit" className="login-button">
            Log In
          </button>
        </div>
      </form>
      <span className="login-btn">
        Didn&apos;t have an account ?
      </span>
      <span
        className="login-signup"
        role="button"
        tabIndex={0}
        onClick={() => props?.onSignIn()}
        onKeyDown={(e) => {
        if (e.key === 'Enter') {
          props?.onSignIn();
        }
      }}
      >
        Sign Up
      </span>
    </div>
  );
};
