import React, { ReactElement } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'

import Pages from '../constants/pages';
import WrappedPage from '../components/WrappedPage';

import LoginForm from '../components/Auth/Login'

interface Props {

}

export default function Login({ }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title>{Pages.SignIn.title}</title>
      </Head>

      <section>
        <div className="container">

          <div className="col-sm-8 px-0 mx-auto">
            <WrappedPage>
              <LoginForm />
            </WrappedPage>
          </div>

        </div>
      </section>
    </Layout>
  )
}
