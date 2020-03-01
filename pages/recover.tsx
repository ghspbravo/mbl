// redirect users with token
import React, { ReactElement, useState } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'

import Pages from '../constants/pages';
import WrappedPage from '../components/WrappedPage';

import { useForm } from "react-hook-form";
import Input from '../components/Inputs/Input';
import { emailRegexp } from '../constants/regexp';
import Api from '../constants/api';
import { fetcher } from '../constants/fetcher';

import { RecoverFormatter } from '../constants/formatters/authFormatter'

interface Props {

}

enum steps {
  recover, success
}

export default function Recover({ }: Props): ReactElement {
  const { handleSubmit, register, errors, setError, clearError } = useForm({
    mode: "onBlur"
  });

  const [currentStep, currentStepSet] = useState(steps.recover)
  const [submitting, submittingSet] = useState(false);
  const onSubmit = async values => {
    clearError("recover");
    submittingSet(true);

    const apiResponse = fetcher.fetch(Api.ResetPassword, {
      params: {
        email: values.email
      }
    })

    const recoverFormatter = new RecoverFormatter();

    const response = await recoverFormatter.format(apiResponse)
    if (response.status > 0) {
      setError("recover", "recoverError", response.body)
    } else {
      currentStepSet(steps.success)
    }
    submittingSet(false);
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

              {currentStep === steps.recover && <form onSubmit={handleSubmit(onSubmit)}>
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
                  <button disabled={submitting} className="primary full">{submitting ? "..." : "Продолжить"}</button>
                </div>
              </form>}

              {currentStep === steps.success && <div>
                <h2>Успех!</h2>
                <p>Письмо для сброса пароля отправлено на почту.</p>
              </div>}

            </WrappedPage>
          </div>

        </div>
      </section>
    </Layout>
  )
}
