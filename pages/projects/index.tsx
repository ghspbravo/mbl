import React, { ReactElement, useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import Pages from "../../constants/pages";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Status } from "../../constants/formatters/rootFormatter";
import { fetcher } from "../../constants/fetcher";
import Api from "../../constants/api";
import EventsFormatter, {
	shortEvent,
} from "../../constants/formatters/eventsFormatter";
import EventItem from "../../components/Events/EventItem";
import ProjectItem from "../../components/Projects/ProjectItem";
import { shortProject } from "../../constants/formatters/projectsFormatter";

interface Props {}

let currentPage = 0;

export default function Projects({}: Props): ReactElement {
	const [status, statusSet] = useState(Status.loading);
	const [error, errorSet] = useState("");
	const [list, listSet] = useState<shortProject[]>([]);
	const [hasNext, hasNextSet] = useState(false);

	// const fetchEvents = async () => {
	// 	statusSet(Status.loading);
	// 	const responseApi = fetcher.fetch(Api.EventList, {
	// 		params: {
	// 			count: 20,
	// 			page: ++currentPage,
	// 		},
	// 	});
	// 	const formatter = new EventsFormatter();

	// 	const response = await formatter.eventsList(responseApi);
	// 	if (response.status > 0) {
	// 		statusSet(response.status);
	// 		errorSet(response.body);
	// 	} else {
	// 		statusSet(response.status);
	// 		listSet([...list, ...response.body.events]);
	// 		hasNextSet(response.body.hasNext);
	// 	}
	// };

	useEffect(() => {
		currentPage = 0;

		// mock projects
		statusSet(Status.success);
		listSet([
			{
				id: 1,
				title: "Онлайн-школа испанского языка",
        goal: "Учить испанскому языку",
        description: "Онлайн-сервис объедияет студентов и преподавателей по всему миру. Предлагает различные курсы и частные уроки испанского языка для любого уровня подготовки. Определите цель изучения...",
        organisator: {
          id: 1, shortTitle: "Company 1", photo: "pass"
        }
			},
			{
				id: 2,
				title: "Онлайн-школа испанского языка",
        goal: "Учить испанскому языку",
        description: "Онлайн-сервис объедияет студентов и преподавателей по всему миру. Предлагает различные курсы и частные уроки испанского языка для любого уровня подготовки. Определите цель изучения...",
        organisator: {
          id: 1, shortTitle: "Company 1", photo: "pass"
        }
			},
			{
				id: 3,
				title: "Онлайн-школа испанского языка",
        goal: "Учить испанскому языку",
        description: "Онлайн-сервис объедияет студентов и преподавателей по всему миру. Предлагает различные курсы и частные уроки испанского языка для любого уровня подготовки. Определите цель изучения...",
        organisator: {
          id: 1, shortTitle: "Company 1", photo: "pass"
        }
			},
		]);

		// TODO: fetch programs
		// fetchEvents();
	}, []);

	const onLoadMoreHandler = () => {
		// fetchEvents();
	};

	const hasItems = list.length > 0;
	return (
		<Layout>
			<Head>
				<title>{Pages.Projects.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs pages={[{ title: Pages.Projects.header }]} />

					<h1>{Pages.Projects.header}</h1>

					{hasItems ? (
						<div>
							<div className="row">
								{list.map(item => (
									<div className="col-sm-6 col-12 mb-5 cource-item" key={item.id}>
										<ProjectItem content={item} />
									</div>
								))}
							</div>

							{hasNext && status === Status.success && (
								<div onClick={onLoadMoreHandler} className="align-center mt-5">
									<button className="mx-auto">показать еще</button>
								</div>
							)}
						</div>
					) : (
						status === Status.success && <p>Программ не найдено</p>
					)}
					{status > 0 &&
						(status === Status.loading ? <p>Загрузка...</p> : <p>{error}</p>)}
				</div>
			</section>
		</Layout>
	);
}
