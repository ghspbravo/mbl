import React, { ReactElement, useState } from "react";
import CourcesFormatter, {
	Cource,
} from "../../constants/formatters/courcesFormatter";
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
import pass from "../../assets/pass.png";

interface Props {
	status: number;
	body: Cource;
}

export default function CourceSingle({ status, body }: Props): ReactElement {
	const {
		id,
		title,
		fullDescription,
		isApplied,
		canApply,
		contacts,
		organisator,
		duration,
		photo,
		dateEnd,
		dateStart,
	} = body;

	const [processing, processingSet] = useState(false);
	const [openModal, openModalSet] = useState(false);
	const [modalMessage, modalMessageSet] = useState("");
	const [hasSuccessApply, hasSuccessApplySet] = useState(isApplied);
	const onRegister = async (isAuthed: boolean) => {
		if (!isAuthed) {
			modalMessageSet("Для записи в программу Вам необходимо авторизоваться");
			openModalSet(true);
			return;
		}
		processingSet(true);

		const response = await fetcher.fetch(Api.CourceApply, {
			params: {
				programId: id,
			},
		});

		if (response.status > 0) {
			modalMessageSet("Произошла ошибка. " + response.body);
			openModalSet(true);
		} else {
			modalMessageSet(
				"Вы успешно записались на мероприятия. Организатор свяжется с Вами в ближайшее время"
			);
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
					{Pages.Cources.title} | {title}
				</title>
			</Head>
			<AuthContext.Consumer>
				{({ isAuth }) => (
					<section>
						<div className="container">
							<div className="col-lg-7 col-md-9 col-12">
								<Breadcrumbs
									pages={[
										{ title: Pages.Cources.title, href: Pages.Cources.route },
										{ title: title },
									]}
								/>

								<div className="mt-3">
									<h1>{title}</h1>

									<div className="row no-gutters align-items-center">
										<div className="mb-2 cource__dates">{duration}</div>

										{canApply && (
											<div className="col-12 col-md ml-md-4 ml-0 registration-status">
												Регистрация открыта
											</div>
										)}
									</div>

									<div className="mt-5">
										<h2>Контакты</h2>
										<p>{contacts}</p>
									</div>

									{dateStart && dateEnd && (
										<div className="mt-2">
											<h2>Даты</h2>
											<p>
												Дата начала: {dateStart}
												<br />
												Дата конца: {dateEnd}
											</p>
										</div>
									)}

									{photo && (
										<div className="mt-2">
											<img
												className="responsive"
												src={photo}
												alt="Фото программы"
											/>
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

									<div className="mt-3">
										<h2>О программе</h2>
										<p>{fullDescription}</p>
									</div>

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
								.cource__dates {
									text-align: center;
									background-color: ${Colors.Acsent};
									padding: 7px 8px;

									font-weight: bold;
									line-height: 1.5;
								}
								.registration-status {
									color: ${Colors.Acsent};
									text-transform: uppercase;
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
				<h1>Неопознанная программа</h1>
				<p>
					Не удалось загрузить программу. Обновите страницу или{" "}
					<Link href="/" passHref>
						<a>перейдите на главную</a>
					</Link>
				</p>
			</div>
		</Layout>
	);
}

CourceSingle.getInitialProps = async (context) => {
	const { id } = context.query;

	const response = isoFetcher.fetch(Api.CourceSingle, {
		params: {
			id,
		},
	});
	const formatter = new CourcesFormatter(),
		item = await formatter.courceSingle(response);

	const props = {
		status: item.status,
		body: item.body,
	};

	return props;
};
