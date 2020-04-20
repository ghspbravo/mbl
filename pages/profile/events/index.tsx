import React, { ReactElement } from "react";
import Layout, { AuthContext } from "../../../components/Layout";
import Head from "next/head";
import Pages from "../../../constants/pages";
import ProfileNavigation, {
	profileTabs,
} from "../../../components/Profile/ProfileNavigation";
import PortfolioItem from "../../../components/Profile/PortfolioItem";
import Link from "next/link";

interface Props {}

export default function ProfileEvents({}: Props): ReactElement {
	return (
		<Layout>
			<Head>
				<title>{Pages.Profile.title}</title>
			</Head>

			<section>
				<div className="container">
					<h1 className="m-align-center">{Pages.Profile.header}</h1>

					<div className="my-5">
						<ProfileNavigation currentTab={profileTabs.events} />
					</div>
				</div>
			</section>

      <div className="container mb-5">
        <Link href={Pages.CreateEvent.route}>
          <button>Создать мероприятие</button>
        </Link>
      </div>

			<AuthContext.Consumer>
				{({ isAuth, currentUser }) => (
					<div className="container">
            {currentUser.myEvents.length > 0
            ? currentUser.myEvents.map((item, index) => (
							<div className="mb-2" key={index}>
								<PortfolioItem
									title={item.title}
									href={Pages.Events.route + "/" + item.id}
								/>
							</div>
            ))
          : (
            <div>
              <p>Нет мероприятий</p>
            </div>
          )}
					</div>
				)}
			</AuthContext.Consumer>
		</Layout>
	);
}
