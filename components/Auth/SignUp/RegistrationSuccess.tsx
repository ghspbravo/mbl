import React, { ReactElement } from 'react'
import Link from 'next/link'
import Pages from '../../../constants/pages'

interface Props {
  
}

export default function RegistrationSuccess({}: Props): ReactElement {
  return (
    <div>
      <h2>Успех!</h2>
      <p>Поздравляем, с завершением регистрации. Теперь Вам доступен весь функционал сервиса.</p>
      <p>В <b>личном кабинете</b> Вы можете заполнить дополнительную информацию о себе, 
        следить за своими мероприятиями, программами, проектами, а также привязать собственную компанию!</p>
      <div>
        <Link href={Pages.Profile.route} passHref>
          <a className="button clear primary">Перейти в личный кабинет</a>
        </Link>
      </div>
      <Link href={Pages.Home.route} passHref>
        <a className="button clear mt-3">На главную</a>
      </Link>
    </div>
  )
}
