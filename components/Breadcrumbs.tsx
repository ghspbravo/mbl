import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link';
import Pages from '../constants/pages'

type Pages = {
  title: string,
  href?: string
}[]

interface Props {
  pages?: Pages
}


function Breadcrumbs({ pages = [] }: Props): ReactElement {
  const navigation: Pages = [
    { title: Pages.Home.title, href: Pages.Home.route },
    ...pages
  ]

  return (
    <div className="breadcrumbs">
      {navigation.map((navItem, index) => navItem.href
        ? <div key={index} className="breadcrumbs-item">
          <Link href={navItem.href} passHref>
            <a className="clear">{navItem.title}</a>
          </Link>
        </div>
        : <div key={index} className="breadcrumbs-item">
          {navItem.title}
        </div>)}

      <style jsx>{`
        .breadcrumbs-item {
          display: inline;
          position: relative;
        }
        .breadcrumbs-item:not(:last-child) {
          margin-right: 15px;
        }
        .breadcrumbs-item:not(:last-child)::after {
          content: '/';
          margin-left: 15px;
        }
        .breadcrumbs-item a:hover {
          text-decoration: underline;
        }
        `}</style>
    </div>
  )
}

export default Breadcrumbs;