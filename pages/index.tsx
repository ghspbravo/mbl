import React from 'react'
import Layout from '../components/Layout'

function Home() {
  return (
    <Layout>
      <section>
        <div className="container">
          <h1>Home page</h1>
          <div className="row">
            <div className="col-6">1</div>
            <div className="col-6">2</div>
          </div>
          <button>button</button>
          <a href="#">Link</a>
        </div>
      </section>
    </Layout>
  )
}

export default Home
