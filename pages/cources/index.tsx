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
import CourcesFormatter, { shortCource } from "../../constants/formatters/courcesFormatter";
import CourceItem from "../../components/Cources/CourceItem";

interface Props {}

let currentPage = 0;

export default function Cources({}: Props): ReactElement {
	const [status, statusSet] = useState(Status.loading);
	const [error, errorSet] = useState("");
	const [list, listSet] = useState<shortCource[]>([]);
	const [hasNext, hasNextSet] = useState(false);

	const fetchCources = async () => {
		statusSet(Status.loading);
		const responseApi = fetcher.fetch(Api.CourceList, {
			params: {
				count: 20,
				page: ++currentPage,
			},
		});
		const formatter = new CourcesFormatter();

		const response = await formatter.courcesList(responseApi);
		if (response.status > 0) {
			statusSet(response.status);
			errorSet(response.body);
		} else {
			statusSet(response.status);
			listSet([...list, ...response.body.cources]);
			hasNextSet(response.body.hasNext);
		}
	};

	useEffect(() => {
		currentPage = 0;
		fetchCources();
	}, []);

	const onLoadMoreHandler = () => {
		fetchCources();
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
