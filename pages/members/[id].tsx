import React, { ReactElement } from "react";
import { isoFetcher } from "../../constants/fetcher";
import Api from "../../constants/api";
import {
	ProfileFormatter,
	userInterface,
} from "../../constants/formatters/profileFormatter";
import Layout from "../../components/Layout";
import { Status } from "../../constants/formatters/rootFormatter";
import Head from "next/head";
import Pages from "../../constants/pages";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import Tag from "../../components/Tag";

interface Props {
	status: number;
	body: userInterface;
}

export default function MemberItem({ status, body }: Props): ReactElement {
	return status === Status.success ? (
		<Layout>
			<Head>
				<title>
					{Pages.Members.title} | {body.name}
				</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs
						pages={[
							{ title: Pages.Members.title, href: Pages.Members.route },
							{ title: body.name },
						]}
					/>

					<div className="row mt-3">
						<div className="d-none d-lg-block col-lg-4">
							<img
								className="responsive"
								src={body.photo}
								alt="Фотография человека"
							/>
						</div>
						<div className="col-lg-8">
							<h1>{body.name}</h1>

							<div className="row no-gutters mb-5">
								{body.roles?.map((role) => (
									<div key={role.id} className="mb-2 mr-2">
										<Tag>{role.name}</Tag>
									</div>
								))}
							</div>

							<div className="d-lg-none mb-4">
								<img
									className="responsive mx-auto"
									style={{ maxWidth: "350px" }}
									src={body.photo}
									alt="Фотография человека"
								/>
							</div>

							{body.birthday && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Дата рождения:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{body.birthday}
									</div>
								</div>
							)}
							{body.phone && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Телефон:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{body.phone}
									</div>
								</div>
							)}
							{body.education && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Место учебы:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{body.education}
									</div>
								</div>
							)}
							{body.workList?.length > 0 && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Место работы:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{body.workList.map((work, index) => (
											<div key={index}>
												{`${work.name}, ${
													work.end
														? `${work.start} – ${work.end}`
														: `с ${work.start}`
												}`}
											</div>
										))}
									</div>
								</div>
							)}
							{body.spheresList?.length > 0 && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Интересы:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{body.spheresList.map((sphere) => sphere.name).join(",")}
									</div>
								</div>
							)}
							{body.interests && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Навыки:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{body.interests}
									</div>
								</div>
							)}
							{body.achievements && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Интересы и достижения:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{body.achievements}
									</div>
								</div>
							)}
							{body?.socialLinks?.length > 0 && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Социальные сети:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{body.socialLinks.map((link, index) => (
											<a key={index} target="_blank" href={link}>
												{link}
											</a>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</Layout>
	) : (
		<Layout>
			<div className="container">
				<h1>Неопознанный участник</h1>
				{status === Status.critical && (
					<p>
						Не удалось загрузить участника. Обновите страницу или{" "}
						<Link href="/" passHref>
							<a>перейдите на главную</a>
						</Link>
					</p>
				)}
				{status !== Status.critical && <p>{body}</p>}
			</div>
		</Layout>
	);
}

MemberItem.getInitialProps = async (context) => {
	const { id: memberId } = context.query;

	const profileResponse = isoFetcher.fetch(Api.MembersItem, {
		params: {
			id: memberId,
		},
	});
	const profileFormatter = new ProfileFormatter(),
		member = await profileFormatter.formatUser(profileResponse);

	const props = {
		status: member.status,
		body: member.body,
	};

	return props;
};
