import React, { ReactElement } from 'react'
import Link from 'next/link'
import Pages from '../../constants/pages'
import { shortMember } from '../../constants/formatters/membersFormatter'

interface Props {
  contents: shortMember
}

export default function MemberItem({ contents: member }: Props): ReactElement {
  return (
    <Link href={Pages.Members.route + `/${member.id}`}>
      <div className="member-item">
        <img className="responsive" src={member.photo} alt="Фотография участника" />
        <div className="align-center mt-2">
          <span className="member__name"><b>{member.name}</b></span>
          <br /> <span className="member__role">{member.role}</span>
        </div>
        <style jsx>{`
        .member-item {
          cursor: pointer;
        }
        .member-item:hover .member__name {
          text-decoration: underline;
        }
        `}</style>
      </div>
    </Link>
  )
}
