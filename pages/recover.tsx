import React, { ReactElement } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'

import Pages from '../constants/pages';
import WrappedPage from '../components/WrappedPage';

import { useForm } from "react-hook-form";
import Input from '../components/Inputs/Input';
import { emailRegexp } from '../constants/regexp';

interface Props {

}

export default function Recover({ }: Props): ReactElement {
  const { handleSubmit, register, errors, setError, clearError } = useForm({
    mode: "onBlur"
  });
  const onSubmit = values => {
    clearError("recover");
    // TODO: handle recover
    console.log(values);
    const valid = false;
    if (!valid) {
      setError("recover", "recoverError", "Ошибка связи с сервером")
      // setError("recover", "recoverError", "Пользователь с введенными реквизитами не найден")
    }
  };
  return (
    <Layout>
      <Head>
        <title>{Pages.Recover.title}</title>
      </Head>

      <section>
        <div className="container">

          <div className="col-sm-8 px-0 mx-auto">
            <WrappedPage>
              <h1 className="align-center">{Pages.Recover.header}</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <Input name="email" label="Почта, указанная при регистрации"
                    error={errors.email}
                    ref={register({
                      required: true,
                      pattern: {
                        value: emailRegexp,
                        message: "Неверный формат почты"
                      }
                    })}
                  />
                </fieldset>

                {errors.recover && <div className="error">
                  {(errors.recover as any).message}
                </div>}

                <p className="small">На введенную вами почту будет выслано письмо с инструкцией по сбросу пароля.</p>

                <div className="mt-5 col-10 col-sm-12 px-0 mx-auto">
                  <button className="primary full">Продолжить</button>
                </div>
              </form>
            </WrappedPage>
          </div>

        </div>
      </section>
    </Layout>
  )
}
