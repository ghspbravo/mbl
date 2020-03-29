import React, { ReactElement } from "react";
import Layout, { AuthContext } from "../../../components/Layout";
import Head from "next/head";
import Pages from "../../../constants/pages";
import ProfileNavigation, {
	profileTabs,
} from "../../../components/Profile/ProfileNavigation";

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

			<AuthContext.Consumer>
				{({ isAuth, currentUser }) => <div className="container">
            <p>В разработке</p>
          </div>}
			</AuthContext.Consumer>
		</Layout>
	);
}
