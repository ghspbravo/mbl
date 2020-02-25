import React, { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Pages from '../constants/pages';
import WrappedPage from '../components/WrappedPage';
import RegistrationForm from '../components/Auth/SignUp/RegistrationForm';
import RegistrationSuccess from '../components/Auth/SignUp/RegistrationSuccess';

interface Props {

}

enum Steps {
  registration, success
}

export default function Join({ }: Props): ReactElement {
  const [currentStep, currentStepSet] = useState(Steps.registration)
  return (
    <Layout>
      <Head>
        <title>{Pages.SignUp.title}</title>
      </Head>

      <section>
        <div className="container">

          <WrappedPage>
            <h1 className="align-center">{Pages.SignUp.header}</h1>

            {(() => {
              switch (currentStep) {
                case Steps.registration:
                  return <RegistrationForm nextStepHandler={() => { currentStepSet(Steps.success) }} />

                case Steps.success:
                  return <RegistrationSuccess />

                default:
                  break;
              }
            })()}

          </WrappedPage>

        </div>
      </section>
    </Layout>
  )
}
