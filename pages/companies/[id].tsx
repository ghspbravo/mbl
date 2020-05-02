import React, { ReactElement } from "react";
import { isoFetcher } from "../../constants/fetcher";
import Api from "../../constants/api";
import CompanyFormatter, {
	Company,
} from "../../constants/formatters/companyFormatter";
import Layout from "../../components/Layout";
import Head from "next/head";
import Pages from "../../constants/pages";
import { Status } from "../../constants/formatters/rootFormatter";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";

interface Props {
	status: number;
	body: Company;
}

export default function CompanySingle({ status, body }: Props): ReactElement {
	return status === Status.success ? (
		<Layout>
			<Head>
				<title>
					{Pages.Companies.title} | {body.shortTitle}
				</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs
						pages={[
							{ title: Pages.Companies.title, href: Pages.Companies.route },
							{ title: body.shortTitle },
						]}
					/>

					<div className="mt-3">
						<div className="row">
							<div className="col-lg-3">
								<img
									className="responsive"
									src={body.logo}
									alt="Лого компании"
								/>
							</div>
							<div className="col-lg-9">
								<h1 className="mb-4">{body.shortTitle}</h1>

								{body.image && (
									<div className="mb-2">
										<img
											className="responsive"
											src={body.image}
											alt="Фото компании"
										/>
									</div>
								)}

								<div className="row">
									<div className="col-lg-5 col-md-6 col-12">
										<b>Название юр. лица:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.title}</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Дата основания:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">
										{body.foundationDate}
									</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>ИНН:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.inn}</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Виды деятельности:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.spheres}</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Руководитель:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.creator}</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Размер компании:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.size}</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Количество сотрудников:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">
										{body.membersCount}
									</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Объем годовой выручки:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.costValue}</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Email:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.email}</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Телефон:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.phone}</div>

									<div className="col-lg-5 col-md-6 col-12">
										<b>Сайт:</b>
									</div>
									<div className="col-md-6 col-12 mb-4">{body.site}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	) : (
		<Layout>
			<div className="container">
				<h1>Неопознанная компания</h1>
				<p>
					Не удалось загрузить компанию. Обновите страницу или{" "}
					<Link href="/" passHref>
						<a>перейдите на главную</a>
					</Link>
				</p>
			</div>
		</Layout>
	);
}

CompanySingle.getInitialProps = async (context) => {
	const { id: companyId } = context.query;

	const response = isoFetcher.fetch(Api.CompanySingle, {
		params: {
			id: companyId,
		},
	});
	const formatter = new CompanyFormatter(),
		item = await formatter.companySingle(response);

	const props = {
		status: item.status,
		body: item.body,
	};

	return props;
};
