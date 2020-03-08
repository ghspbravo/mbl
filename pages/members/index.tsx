import React, { ReactElement, useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Head from 'next/head'
import Pages from '../../constants/pages'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Status } from '../../constants/formatters/rootFormatter'
import { fetcher } from '../../constants/fetcher'
import Api from '../../constants/api'
import { MembersFormatter, members } from '../../constants/formatters/membersFormatter'
import MemberItem from '../../components/Members/MemberItem'

interface Props {

}

let currentPage = 0;

export default function Members({ }: Props): ReactElement {
  const [status, statusSet] = useState(Status.loading)
  const [message, messageSet] = useState('')
  const [membersList, membersListSet] = useState([])
  const [hasNext, hasNextSet] = useState(false);

  const hasItems = status === Status.success;

  const fetchMembers = async () => {
    const membersResponse = fetcher.fetch(Api.MembersList, {
      params: {
        count: 16,
        page: ++currentPage
      }
    })

    const membersFormatter = new MembersFormatter(),
      membersListResponse = await membersFormatter.formatList(membersResponse);

    if (membersListResponse.status > 0) {
      statusSet(membersListResponse.status);
      messageSet(membersListResponse.body);
    } else {
      statusSet(membersListResponse.status);
      membersListSet([
        ...membersList,
        ...membersListResponse.body?.members
      ]);
      hasNextSet(membersListResponse.body.hasNext);
    }
  }
  useEffect(() => {
    currentPage = 0;
    fetchMembers();
  }, [])

  const onLoadMoreHandler = () => {
    fetchMembers();
  }
  return (
    <Layout>
      <Head>
        <title>{Pages.Members.title}</title>
      </Head>

      <section>
        <div className="container">
          <Breadcrumbs pages={[{ title: Pages.Members.title }]} />

          <h1>{Pages.Members.header}</h1>

          {hasItems
            ? <div>
              {(membersList as members[]).length > 0
                ? <div className="row">
                  {(membersList as members[]).map(item => <div key={item.id} className="col-sm-4 col-lg-3 col-6 mb-5">
                    <MemberItem contents={item} />
                  </div>)}

                </div>
                : <div>
                  Нет участников
                </div>}

              {hasNext && <div onClick={onLoadMoreHandler} className="align-center">
                <button className="mx-auto">показать еще</button>
              </div>}
            </div>
            : <div>
              {status === Status.loading ? 'Загрузка участников...' : message}
            </div>}
        </div>
      </section>
    </Layout>
  )
}
