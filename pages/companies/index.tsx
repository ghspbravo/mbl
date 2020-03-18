import React, { ReactElement, useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import Pages from "../../constants/pages";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Status } from "../../constants/formatters/rootFormatter";
import { fetcher } from "../../constants/fetcher";
import Api from "../../constants/api";
import CompanyFormatter from "../../constants/formatters/companyFormatter";
import pass from "../../assets/pass.png";
import CompanyItem from "../../components/Companies/CompanyItem";

interface Props {}

let currentPage = 0;

export default function Companies({}: Props): ReactElement {
	const [status, statusSet] = useState(Status.loading);
	const [error, errorSet] = useState("");
	const [list, listSet] = useState([]);
	const [hasNext, hasNextSet] = useState(false);

	const fetchCompanies = async () => {
		statusSet(Status.loading);
		const responseApi = fetcher.fetch(Api.CompanyList, {
			params: {
				count: 20,
				page: ++currentPage,
			},
		});
		const formatter = new CompanyFormatter();

		const response = await formatter.companiesList(responseApi);
		if (response.status > 0) {
			statusSet(response.status);
			errorSet(response.body);
		} else {
			statusSet(response.status);
			listSet([...list, ...response.body.companies]);
			hasNextSet(response.body.hasNext);
		}
	};

	useEffect(() => {
		currentPage = 0;
		fetchCompanies();
	}, []);

	const onLoadMoreHandler = () => {
		fetchCompanies();
	};

	const hasItems = list.length > 0;
	return (
		<Layout>
			<Head>
				<title>{Pages.Companies.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs pages={[{ title: Pages.Companies.header }]} />

					<h1>{Pages.Companies.header}</h1>

					{hasItems ? (
						<div>
							<div className="row">
								{list.map(item => (
									<div className="col-lg-3 col-md-4 col-6 mb-3" key={item.id}>
										<CompanyItem content={item} />
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
						status === Status.success && <p>Компаний не найдено</p>
					)}
					{status > 0 &&
						(status === Status.loading ? <p>Загрузка...</p> : <p>{error}</p>)}
				</div>
			</section>
		</Layout>
	);
}
