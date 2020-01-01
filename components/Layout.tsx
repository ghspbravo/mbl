import React from 'react'

import Head from 'next/head'
import Header from './Header/Header'

interface Props {
  children: JSX.Element[] | JSX.Element
}

function Layout({ children: pageContent }: Props) {
  return (
    <>
      <Head>
        <title>Молодежная бизнесс лига</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>

      <Header />

      <main>
        {pageContent}
      </main>

      <footer>
        <span>footer</span>
      </footer>

      <style jsx>{`
          main {
            position: relative;
            z-index: 5;
          }
        `}</style>
    </>
  )
}

export default Layout