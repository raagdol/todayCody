import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { signin } from "api/auth";
import Footer from "components/layout/Footer";

export default function Login() {
  const [inputs, setInputs] = useState({
    account: "",
    password: "",
  });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(inputs.account && inputs.password);
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [inputs.account, inputs.password]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(inputs);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="formContainer">
        <img src="assets/icon/sign-logo.svg" alt="" />
        <input
          type="text"
          name="account"
          required
          value={inputs.account}
          onChange={changeHandler}
          placeholder="아이디"
        />
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={changeHandler}
          placeholder="비밀번호"
        />
        <button type="submit" disabled={!formIsValid}>
          로그인
        </button>
        <div className="help">
          <Link to="#">비밀번호 찾기</Link> | <Link to="/signUp">회원가입</Link>
        </div>
      </form>
      <Footer />
    </div>
  );
}
