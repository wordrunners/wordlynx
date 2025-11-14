/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/Button";
import { useForm, useAuth, useAppDispatch } from "@/hooks";
import validate from "@/Core/ValidateForm";
import { signin, fetchOAuth } from "@/store/authSlice";

import "./signinPage.scss";

export const SigninPage: FC = () => {
  const { handleChange, handleSubmit, values, errors } = useForm(submitForm, { login: "", password: "" }, validate);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  function submitForm() {
    dispatch(signin(values));
  }

  function handleOAuth() {
    dispatch(fetchOAuth());
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user]);

  return (
    <div className="auth">
      <Form onSubmit={handleSubmit}>
        <h1 className="auth__title">Login</h1>
        <FormField type="text" name="login" value={values.login} label="Login" onChange={handleChange} />
        {errors.login && <p className="auth__error">{errors.login}</p>}
        <FormField type="password" name="password" value={values.password} label="Password" onChange={handleChange} />
        {errors.password && <p className="auth__error">{errors.password}</p>}
        <Button className="auth__btn" type="submit">Login</Button>
        <Button className="auth__btn" onClick={handleOAuth}>Login with Yandex</Button>
        <Link className="auth__link" to={`/signup`} >Don't have an account? Sign up</Link>
      </Form>
    </div>
  )
}
