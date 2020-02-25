import React, { ReactElement } from 'react'
import Icon from '../Icon'
import Input from '../Inputs/Input'
import Pages from '../../constants/pages'
import Link from 'next/link'

import { emailRegexp } from '../../constants/regexp';

import { useForm } from "react-hook-form";

interface Props {

}

export default function Login({ }: Props): ReactElement {
  const { handleSubmit, register, errors, setError, clearError } = useForm({
    mode: "onBlur"
  });
  const onSubmit = values => {
    clearError("auth");
    // TODO: handle login
    console.log(values);
    const valid = false;
    if (!valid) {
      setError("auth", "authError", "Ошибка связи с сервером")
      // setError("auth", "authError", "Неверный логин/пароль")
    }
  };
  return (
    <div className="col-md-10 mx-auto">

      <h1 className="align-center">{Pages.SignIn.header}</h1>

      <form className="no-gutters" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div className="mb-3">
            <Input name="username" label="Почта" type="email"
              error={errors.username}
              ref={register({
                required: true,
                pattern: {
                  value: emailRegexp,
                  message: "Неверный формат почты"
                }
              })}
            />
          </div>
          <div>
            <Input name="password" label="Пароль" type="password"
              error={errors.password}
              ref={register({
                required: true,
                minLength: {
                  value: 6,
                  message: "Пароль должен содержать хотя бы 6 символов"
                }
              })}
            />
          </div>
        </fieldset>

        {errors.auth && <div className="error">
          {(errors.auth as any).message}
        </div>}

        <div className="mt-3">
          <Link passHref href={Pages.Recover.route}>
            <a className="primary">Забыли пароль?</a>
          </Link>
        </div>

        <div className="mt-5 col-10 col-sm-12 px-0 mx-auto">
          <button className="primary full">Войти</button>
        </div>
      </form>

      <div className="mt-5 align-center">
        <span>или войдите через аккаунт:</span>
      </div>
      <div className="col-xl-8 col-sm-12 col-10 no-gutters mt-4 mx-auto">

        <div className="row justify-content-between">
          {/* TODO: pass social hrefs */}
          <a href="#" className="center social-item social-item__gl">
            <Icon color="white" size={40} name="ei-sc-google-plus" />
          </a>
          <a href="#" className="center social-item social-item__fb">
            <Icon color="white" size={40} name="ei-sc-facebook" />
          </a>
          <a href="#" className="center social-item social-item__vk">
            <Icon color="white" size={40} name="ei-sc-vk" />
          </a>

        </div>
      </div>

      <style jsx>{`
                  .social-item {
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
    
                    transition: background-color 0.3s ease-in;
                    will-change: background-color;
                  }
                  @media screen and (max-width: 576px) {
                    .social-item {
                      width: 50px;
                      height: 50px;
                      border-radius: 25px;
                    }
                  }
                  .social-item__vk {
                    background-color: #4C6C91;
                  }
                  .social-item__vk:hover {
                    background-color: #365d8d;
                  }
                  .social-item__fb {
                    background-color: #3B5998;
                  }
                  .social-item__fb:hover {
                    background-color: #4d6496;
                  }
                  .social-item__gl {
                    background-color: #F34A38;
                  }
                  .social-item__gl:hover {
                    background-color: #ee6f61;
                  }
                `}</style>
    </div>

  )
}
