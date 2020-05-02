import React, { ReactElement, useState } from "react";
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
import ProjectsFormatter, {
	Project,
} from "../../constants/formatters/projectsFormatter";

interface Props {
	status: number;
	body: Project;
}

export default function ProjectSingle({ status, body }: Props): ReactElement {
	const {
		id,
		title,
		description,
		goal,
		organisator,
		shortDescription,
		product,
		actuality,
		advantages,
		dateStart,
		image,
	} = body;

	// const [processing, processingSet] = useState(false);
	// const [openModal, openModalSet] = useState(false);
	// const [modalMessage, modalMessageSet] = useState("");
	// const [hasSuccessApply, hasSuccessApplySet] = useState(isApplied);
	// const onRegister = async (isAuthed: boolean) => {
	// 	if (!isAuthed) {
	// 		modalMessageSet("Для записи в программу Вам необходимо авторизоваться");
	// 		openModalSet(true);
	// 		return;
	// 	}
	// 	processingSet(true);

	// 	const response = await fetcher.fetch(Api.CourceApply, {
	// 		params: {
	// 			programId: id,
	// 		},
	// 	});

	// 	if (response.status > 0) {
	// 		modalMessageSet("Произошла ошибка. " + response.body);
	// 		openModalSet(true);
	// 	} else {
	// 		modalMessageSet(
	// 			"Вы успешно записались на мероприятия. Организатор свяжется с Вами в ближайшее время"
	// 		);
	// 		openModalSet(true);
	// 		hasSuccessApplySet(true);
	// 	}

	// 	processingSet(false);
	// };
	return status === Status.success ? (
		<Layout>
			{/* <Modal
				open={openModal}
				closeHandler={() => openModalSet(false)}
				width="100%"
			>
				<p>{modalMessage}</p>
			</Modal> */}
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

									{image && (
										<img
											className="responsive"
											src={image}
											alt="Изображение проекта"
										/>
									)}

									<h3>Цель проекта</h3>
									<p>{goal}</p>

									{dateStart && (
										<div className="mt-2">
											<h3>Дата старта</h3>
											<p>{dateStart}</p>
										</div>
									)}

									{actuality && (
										<div className="mt-2">
											<h3>Актуальность</h3>
											<p>{actuality}</p>
										</div>
									)}

									{product && (
										<div className="mt-2">
											<h3>Продукт проекта</h3>
											<p>{product}</p>
										</div>
									)}

									{advantages && (
										<div className="mt-2">
											<h3>Преимущества</h3>
											<p>{advantages}</p>
										</div>
									)}

									{shortDescription && (
										<div className="mt-5">
											<p>{shortDescription}</p>
										</div>
									)}

									<div className="mt-3">
										<p>{description}</p>
									</div>

									{/* {canApply && (
											<div className="col-12 col-md ml-md-4 ml-0 registration-status">
												Регистрация открыта
											</div>
										)} */}

									{/* {canApply && !hasSuccessApply && (
										<div className="mt-3">
											<button
												disabled={processing}
												onClick={() => onRegister(isAuth)}
												className="primary"
											>
												зарегистрироваться
											</button>
										</div>
									)} */}
								</div>
							</div>
						</div>
					</section>
				)}
			</AuthContext.Consumer>
		</Layout>
	) : (
		<Layout>
			<div className="container">
				<h1>Неопознанный проект</h1>
				<p>
					Не удалось загрузить проект. Обновите страницу или{" "}
					<Link href="/" passHref>
						<a>перейдите на главную</a>
					</Link>
				</p>
			</div>
		</Layout>
	);
}

ProjectSingle.getInitialProps = async (context) => {
	const { id } = context.query;

	const response = isoFetcher.fetch(Api.ProjectSingle, {
		params: {
			id,
		},
	});
	const formatter = new ProjectsFormatter(),
		item = await formatter.projectSingle(response);

	const props = {
		status: item.status,
		body: item.body,
	};

	return props;
};
