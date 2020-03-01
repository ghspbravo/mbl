// redirect users with token
import React, { ReactElement, useState } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'

import Pages from '../constants/pages';
import WrappedPage from '../components/WrappedPage';

import LoginForm from '../components/Auth/Login'
import Link from 'next/link';
import { Router } from 'next/router';

interface Props {

}

enum steps {
  login, success
}

export default function Login({ }: Props): ReactElement {
  const [currentStep, currentStepSet] = useState(steps.login)
  return (
    <Layout>
      <Head>
        <title>{Pages.SignIn.title}</title>
      </Head>

      <section>
        <div className="container">

          <div className="col-sm-8 px-0 mx-auto">
            <WrappedPage>
              {currentStep === steps.login && <LoginForm successHandler={() => currentStepSet(steps.success)} />}
              {currentStep === steps.success && <div>
                <h2>Успех!</h2>
                <p>Вы успешно вошли в систему. Можете вернуться к последней просматриваемой странице или на главную.</p>
                <Link passHref href={Pages.Home.route}>
                  <a className="clear button primary mt-2">На главную</a>
                </Link>
                <button className="mt-2" onClick={() => (Router as any).back()}>Вернуться назад</button>
              </div>}
            </WrappedPage>
          </div>

        </div>
      </section>
    </Layout>
  )
}
