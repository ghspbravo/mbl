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
import { shortCource } from "../../constants/formatters/courcesFormatter";
import CourceItem from "../../components/Cources/CourceItem";

interface Props {}

let currentPage = 0;

export default function Cources({}: Props): ReactElement {
	const [status, statusSet] = useState(Status.loading);
	const [error, errorSet] = useState("");
	const [list, listSet] = useState<shortCource[]>([]);
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

		// mock cources
		statusSet(Status.success);
		listSet([
			{
				id: 1,
				title: "Бизнес под ключ 1",
				shortDescription:
					"Готовые решения для бизнеса в любой сфере. Серия лекций, позволяющая быстро внедрить эффективные бизнес-решения в ваш проект.",
				duration: "180 дней",
			},
			{
				id: 2,
				title: "Бизнес под ключ 2",
				shortDescription:
					"Готовые",
				duration: "180 дней",
			},
			{
				id: 3,
				title: "Бизнес под ключ 3",
				shortDescription:
					"Готовые решения для бизнеса в любой сфере. Серия лекций, позволяющая быстро внедрить эффективные бизнес-решения в ваш проект.",
				duration: "180 дней",
			},
			{
				id: 4,
				title: "Бизнес под ключ 4",
				shortDescription:
					"Готовые решения для бизнеса в любой сфере. Серия лекций, позволяющая быстро внедрить эффективные бизнес-решения в ваш проект.",
				duration: "180 дней",
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
				<title>{Pages.Cources.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs pages={[{ title: Pages.Cources.header }]} />

					<h1>{Pages.Cources.header}</h1>

					{hasItems ? (
						<div>
							<div className="row">
								{list.map(item => (
									<div className="col-sm-6 col-12 mb-5 cource-item" key={item.id}>
										<CourceItem content={item} />
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
