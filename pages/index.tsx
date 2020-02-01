import React from 'react'
import Layout from '../components/Layout'
import logo from '../assets/logo_vertical.svg';
import Colors from '../constants/colors';
import NewsItem from '../components/News/NewsItem';
import Link from 'next/link';
import Pages from '../constants/pages';

const newsMock: {
  id: number,
  title: string,
  createdDate: string,
  previewSrc: string
}[] = new Array(6).fill({
  id: 0,
  title: 'Выпускники + Эндаумент = Молодежная бизнес лига',
  createdDate: '12 ноября 2019',
  previewSrc: 'https://picsum.photos/200/200'
})

function Home() {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="row no-gutters align-items-end">
            <div className="brand d-none d-lg-block">
              <div className="brand__wrapper">
                <object style={{ pointerEvents: 'none' }} type="image/svg+xml" data={logo} />
              </div>
            </div>
            <div className="brand-description col text">
              <b>Молодежная бизнес лига (МБЛ)</b> — это сообщество молодых талантов и предпринимателей, которые учатся, обмениваются идеями и знаниями, стремятся изменять мир к лучшему.
            </div>
          </div>

          <style jsx>{`
            .brand__wrapper {
              position: relative;
              background-color: ${Colors.Primary};
              width: 372px; height: 372px;

              border-radius: 50%;
            }

            .brand__wrapper object {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 200px;

              transform: translate(-50%, -50%);
            }

            .brand-description {
              margin-bottom: 50px;
              margin-left: 100px;
            }
            @media screen and (max-width: 992px) {
            .brand-description {
              margin-top: 75px;
              margin-bottom: 0;
              margin-left: 0;
            }   
              }
            `}</style>
        </div>
      </section>

      {/* NEWS */}
      <section>
        <div className="container">
          <h1>Новости</h1>

          <div className="row">
            {newsMock.map(item => <div key={item.id} className="col-lg-6 col-12 mb-5">
              <NewsItem content={item} />
            </div>)}
          </div>

          <div className="align-center">
            <Link passHref={true} href={Pages.News.route}>
              <a className="clear button mx-auto">все новости</a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
