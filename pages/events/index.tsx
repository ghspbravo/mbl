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

interface Props {}

let currentPage = 0;

export default function Events({}: Props): ReactElement {
	const [status, statusSet] = useState(Status.loading);
	const [error, errorSet] = useState("");
	const [list, listSet] = useState<shortEvent[]>([]);
	const [hasNext, hasNextSet] = useState(false);

	const fetchEvents = async () => {
		statusSet(Status.loading);
		const responseApi = fetcher.fetch(Api.EventList, {
			params: {
				count: 20,
				page: ++currentPage,
			},
		});
		const formatter = new EventsFormatter();

		const response = await formatter.eventsList(responseApi);
		if (response.status > 0) {
			statusSet(response.status);
			errorSet(response.body);
		} else {
			statusSet(response.status);
			listSet([...list, ...response.body.events]);
			hasNextSet(response.body.hasNext);
		}
	};

	useEffect(() => {
		currentPage = 0;
		fetchEvents();
	}, []);

	const onLoadMoreHandler = () => {
		fetchEvents();
	};

	const hasItems = list.length > 0;
	return (
		<Layout>
			<Head>
				<title>{Pages.Events.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs pages={[{ title: Pages.Events.header }]} />

					<div className="row">
						<div className="col-md">
							<h1>{Pages.Events.header}</h1>
						</div>
						<div className="col-md">
							<p>
								Мы регулярно проводим полезные мероприятия, направленные на
								формирование эффективного бизнес-сообщества. Лекции,
								мастер-классы, семинары проходят в игровой форме, так что вы
								точно не успеете заскучать.
							</p>
						</div>
					</div>

					{hasItems ? (
						<div>
							<div className="row">
								{list.map((item) => (
									<div className="col-sm-6 col-12 mb-3" key={item.id}>
										<EventItem content={item} />
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
						status === Status.success && <p>Мероприятий не найдено</p>
					)}
					{status > 0 &&
						(status === Status.loading ? <p>Загрузка...</p> : <p>{error}</p>)}
				</div>
			</section>
		</Layout>
	);
}
