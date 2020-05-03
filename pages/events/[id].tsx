import React, { ReactElement, useState } from "react";
import EventsFormatter, {
	Event,
} from "../../constants/formatters/eventsFormatter";
import { isoFetcher, fetcher } from "../../constants/fetcher";
import Api from "../../constants/api";
import { Status } from "../../constants/formatters/rootFormatter";
import Layout, { AuthContext } from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import Pages from "../../constants/pages";
import Breadcrumbs from "../../components/Breadcrumbs";
import Colors from "../../constants/colors";
import Modal from "../../components/Modal";

interface Props {
	status: number;
	body: Event;
}

export default function EventSingle({ status, body }: Props): ReactElement {
	const {
		id,
		title,
		fullDescription,
		endDate,
		startDate,
		isApplied,
		canApply,
		photo,
		contacts,
		location,
	} = body;

	const [processing, processingSet] = useState(false);
	const [openModal, openModalSet] = useState(false);
	const [modalMessage, modalMessageSet] = useState("");
	const [hasSuccessApply, hasSuccessApplySet] = useState(isApplied);
	const onRegister = async (isAuthed: boolean) => {
		if (!isAuthed) {
			modalMessageSet(
				"Для вступления в мероприятия Вам необходимо авторизоваться"
			);
			openModalSet(true);
			return;
		}
		processingSet(true);

		const response = await fetcher.fetch(Api.EventApply, {
			params: {
				eventId: id,
			},
		});

		if (response.status > 0) {
			modalMessageSet("Произошла ошибка. " + response.body);
			openModalSet(true);
		} else {
			modalMessageSet("Вы успешно вступили в мероприятие");
			openModalSet(true);
			hasSuccessApplySet(true);
		}

		processingSet(false);
	};
	return status === Status.success ? (
		<Layout>
			<Modal
				open={openModal}
				closeHandler={() => openModalSet(false)}
				width="100%"
			>
				<p>{modalMessage}</p>
			</Modal>
			<Head>
				<title>
					{Pages.Events.title} | {title}
				</title>
			</Head>
			<AuthContext.Consumer>
				{({ isAuth }) => (
					<section>
						<div className="container">
							<div className="col-lg-7 col-md-9 col-12">
								<Breadcrumbs
									pages={[
										{ title: Pages.Events.title, href: Pages.Events.route },
										{ title: title },
									]}
								/>

								<div className="mt-3">
									<h1>{title}</h1>

									<div className="row no-gutters align-items-center">
										<div className="mb-2 event__dates">
											{startDate} / {endDate}
										</div>

										{canApply && (
											<div className="col-12 col-md registration-status">
												Регистрация открыта
											</div>
										)}
									</div>

									{contacts && (
										<div className="mt-5">
											<h2>Контакты</h2>
											<p>{contacts}</p>
										</div>
									)}

									{location && (
										<div className="mt-3">
											<h2>Место проведения</h2>
											<p>{location}</p>
										</div>
									)}

									{canApply && !hasSuccessApply && (
										<div className="mt-3">
											<button
												disabled={processing}
												onClick={() => onRegister(isAuth)}
												className="primary"
											>
												зарегистрироваться
											</button>
										</div>
									)}

									<div className="mt-5">
										<img
											src={photo}
											alt="Фотография мероприятия"
											className="responsive"
										/>
									</div>

									{fullDescription && (
										<div className="mt-3">
											<h2>О мероприятии</h2>
											<div
												dangerouslySetInnerHTML={{ __html: fullDescription }}
											></div>
										</div>
									)}

									{canApply && !hasSuccessApply && (
										<div className="mt-3">
											<button
												disabled={processing}
												onClick={() => onRegister(isAuth)}
												className="primary"
											>
												зарегистрироваться
											</button>
										</div>
									)}
								</div>
							</div>
							<style jsx>{`
								.event__dates {
									text-align: center;
									background-color: ${Colors.Acsent};
									padding: 7px 8px;

									font-weight: bold;
									line-height: 1.5;
								}
								.registration-status {
									text-align: right;
									color: ${Colors.Acsent};
									text-transform: uppercase;
								}
								@media (max-width: 576px) {
									.registration-status {
										text-align: left;
									}
								}
							`}</style>
						</div>
					</section>
				)}
			</AuthContext.Consumer>
		</Layout>
	) : (
		<Layout>
			<div className="container">
				<h1>Неопознанная мероприятие</h1>
				<p>
					Не удалось загрузить мероприятие. Обновите страницу или{" "}
					<Link href="/" passHref>
						<a>перейдите на главную</a>
					</Link>
				</p>
			</div>
		</Layout>
	);
}

EventSingle.getInitialProps = async (context) => {
	const { id } = context.query;

	const response = isoFetcher.fetch(Api.EventSingle, {
		params: {
			id,
		},
	});
	const formatter = new EventsFormatter(),
		item = await formatter.eventSingle(response);

	const props = {
		status: item.status,
		body: item.body,
	};

	return props;
};
