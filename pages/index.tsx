import React from "react";
import Layout from "../components/Layout";
import logo from "../assets/logo_vertical.svg";
import Colors from "../constants/colors";
import NewsItem from "../components/News/NewsItem";
import Link from "next/link";
import Pages from "../constants/pages";
import { isoFetcher } from "../constants/fetcher";
import Api from "../constants/api";
import {
	NewsListFormatter,
	shortNews,
} from "../constants/formatters/newsFormatter";
import EventsFormatter, {
	shortEvent,
} from "../constants/formatters/eventsFormatter";
import EventItem from "../components/Events/EventItem";
import CourcesFormatter, {
	shortCource,
} from "../constants/formatters/courcesFormatter";
import CourceItem from "../components/Cources/CourceItem";
import {
	MembersFormatter,
	shortMember,
} from "../constants/formatters/membersFormatter";
import CompanyFormatter, {
	shortCompany,
} from "../constants/formatters/companyFormatter";
import MemberItem from "../components/Members/MemberItem";
import CompanyItem from "../components/Companies/CompanyItem";
import ProjectsFormatter, {
	shortProject,
} from "../constants/formatters/projectsFormatter";
import ProjectItem from "../components/Projects/ProjectItem";

interface Props {
	newsResponse: {
		status: number;
		body: {
			news: shortNews[];
		};
	};
	eventsResponse: {
		status: number;
		body: {
			events: shortEvent[];
		};
	};
	courcesResponse: {
		status: number;
		body: {
			cources: shortCource[];
		};
	};
	membersResponse: {
		status: number;
		body: {
			members: shortMember[];
		};
	};
	companiesResponse: {
		status: number;
		body: {
			companies: shortCompany[];
		};
	};
	projectsResponse: {
		status: number;
		body: {
			projects: shortProject[];
		};
	};
}

function Home({
	newsResponse,
	eventsResponse,
	courcesResponse,
	membersResponse,
	companiesResponse,
	projectsResponse,
}: Props) {
	const events = eventsResponse.body?.events;
	const news = newsResponse.body?.news;
	const cources = courcesResponse.body?.cources;
	const members = membersResponse.body?.members;
	const companies = companiesResponse.body?.companies;
	const projects = projectsResponse.body?.projects;
	return (
		<Layout>
			<section>
				<div className="container">
					<div className="row no-gutters align-items-end">
						<div className="brand d-none d-lg-block">
							<div className="brand__wrapper">
								<object
									style={{ pointerEvents: "none" }}
									type="image/svg+xml"
									data={logo}
								/>
							</div>
						</div>
						<div className="brand-description col text">
							<b>Молодежная бизнес лига (МБЛ)</b> — это сообщество молодых
							талантов и предпринимателей, которые учатся, обмениваются идеями и
							знаниями, стремятся изменять мир к лучшему.
						</div>
					</div>

					<style jsx>{`
						.brand__wrapper {
							position: relative;
							background-color: ${Colors.Primary};
							width: 372px;
							height: 372px;

							border-radius: 50%;
						}

						.brand__wrapper object {
							position: absolute;
							top: 50%;
							left: 50%;
							width: 200px;

							transform: translate(-50%, -50%);
						}

						.brand-description {
							margin-bottom: 50px;
							margin-left: 100px;
						}
						@media screen and (max-width: 992px) {
							.brand-description {
								margin-top: 75px;
								margin-bottom: 0;
								margin-left: 0;
							}
						}
						@media screen and (max-width: 576px) {
							.brand-description {
								margin-top: 35px;
							}
						}
					`}</style>
				</div>
			</section>

			<section className="inverted">
				<div className="container">
					<div className="row mb-3">
						<div className="col-md">
							<h1>Мероприятия</h1>
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

					{eventsResponse.status > 0 ? (
						<div>{eventsResponse.body}</div>
					) : (
						<div>
							{events.length > 0 ? (
								<div className="row">
									{events.map((item) => (
										<div key={item.id} className="col-lg-6 col-12 mb-5">
											<EventItem content={item} />
										</div>
									))}
								</div>
							) : (
								<div>Нет новых мероприятий</div>
							)}

							<div className="align-center">
								<Link passHref={true} href={Pages.Events.route}>
									<a className="clear button mx-auto">все мероприятия</a>
								</Link>
							</div>
						</div>
					)}
				</div>
			</section>

			<section>
				<div className="container">
					<h1>Новости</h1>

					{newsResponse.status > 0 ? (
						<div>{newsResponse.body}</div>
					) : (
						<div>
							{news.length > 0 ? (
								<div className="row">
									{news.map((item) => (
										<div key={item.id} className="col-lg-6 col-12 mb-5">
											<NewsItem content={item} />
										</div>
									))}
								</div>
							) : (
								<div>Нет новых новостей</div>
							)}

							<div className="align-center">
								<Link passHref={true} href={Pages.News.route}>
									<a className="clear button mx-auto">все новости</a>
								</Link>
							</div>
						</div>
					)}
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row mb-3">
						<div className="col-md">
							<h1>Программы</h1>
						</div>
						<div className="col-md">
							<p>
								Наши программы помогают студентам стать настоящими
								предпринимателями. Теория и практика ведения бизнеса в
								увлекательной форме.
							</p>
						</div>
					</div>

					{courcesResponse.status > 0 ? (
						<div>{courcesResponse.body}</div>
					) : (
						<div>
							{cources.length > 0 ? (
								<div className="row">
									{cources.map((item) => (
										<div key={item.id} className="col-lg-6 col-12 mb-5">
											<CourceItem content={item} />
										</div>
									))}
								</div>
							) : (
								<div>Нет новых проектов</div>
							)}

							<div className="align-center">
								<Link passHref={true} href={Pages.Cources.route}>
									<a className="clear button mx-auto">все проекты</a>
								</Link>
							</div>
						</div>
					)}
				</div>
			</section>

			<section>
				<div className="container">
					<h1>Участники лиги</h1>

					{membersResponse.status > 0 ? (
						<div>{membersResponse.body}</div>
					) : (
						<div>
							{members.length > 0 ? (
								<div className="row">
									{members.map((item) => (
										<div key={item.id} className="col-lg-3 col-md-4 col-6 mb-5">
											<MemberItem contents={item} />
										</div>
									))}
								</div>
							) : (
								<div>Нет участников</div>
							)}

							<div className="align-center">
								<Link passHref={true} href={Pages.Members.route}>
									<a className="clear button mx-auto">все участники</a>
								</Link>
							</div>
						</div>
					)}
				</div>
			</section>

			<section>
				<div className="container">
					<h1>Компании</h1>

					{companiesResponse.status > 0 ? (
						<div>{companiesResponse.body}</div>
					) : (
						<div>
							{companies.length > 0 ? (
								<div className="row">
									{companies.map((item) => (
										<div key={item.id} className="col-lg-3 col-md-4 col-6 mb-5">
											<CompanyItem content={item} />
										</div>
									))}
								</div>
							) : (
								<div>Нет компаний</div>
							)}

							<div className="align-center">
								<Link passHref={true} href={Pages.Companies.route}>
									<a className="clear button mx-auto">все компании</a>
								</Link>
							</div>
						</div>
					)}
				</div>
			</section>

			<section>
				<div className="container">
					<h1>Проекты</h1>

					{projectsResponse.status > 0 ? (
						<div>{projectsResponse.body}</div>
					) : (
						<div>
							{projects.length > 0 ? (
								<div className="row">
									{projects.map((item) => (
										<div key={item.id} className="col-lg-6 col-12 mb-5">
											<ProjectItem content={item} />
										</div>
									))}
								</div>
							) : (
								<div>Нет новых проектов</div>
							)}

							<div className="align-center">
								<Link passHref={true} href={Pages.Projects.route}>
									<a className="clear button mx-auto">все проекты</a>
								</Link>
							</div>
						</div>
					)}
				</div>
			</section>
		</Layout>
	);
}

Home.getInitialProps = async () => {
	const props: any = {};

	const newsResponse = isoFetcher.fetch(Api.NewsList, {
		params: {
			count: 6,
		},
	});
	const newsFormatter = new NewsListFormatter(),
		newsList = await newsFormatter.format(newsResponse);
	props.newsResponse = {
		status: newsList.status,
		body: newsList.body,
	};

	const eventsResponse = isoFetcher.fetch(Api.EventList, {
		params: {
			count: 2,
		},
	});
	const eventsFormatter = new EventsFormatter(),
		eventsList = await eventsFormatter.eventsList(eventsResponse);
	props.eventsResponse = {
		status: eventsList.status,
		body: eventsList.body,
	};

	const courcesResponse = isoFetcher.fetch(Api.CourceList, {
		params: {
			count: 4,
		},
	});
	const courcesFormatter = new CourcesFormatter(),
		courcesList = await courcesFormatter.courcesList(courcesResponse);
	props.courcesResponse = {
		status: courcesList.status,
		body: courcesList.body,
	};

	const membersResponse = isoFetcher.fetch(Api.MembersList, {
		params: {
			count: 4,
		},
	});
	const membersFormatter = new MembersFormatter(),
		membersList = await membersFormatter.formatList(membersResponse);
	props.membersResponse = {
		status: membersList.status,
		body: membersList.body,
	};

	const companiesResponse = isoFetcher.fetch(Api.CompanyList, {
		params: {
			count: 8,
		},
	});
	const companiesFormatter = new CompanyFormatter(),
		companiesList = await companiesFormatter.companiesList(companiesResponse);
	props.companiesResponse = {
		status: companiesList.status,
		body: companiesList.body,
	};

	const projectsResponse = isoFetcher.fetch(Api.ProjectList, {
		params: {
			count: 4,
		},
	});
	const projectsFormatter = new ProjectsFormatter(),
		projectsList = await projectsFormatter.ProjectsList(projectsResponse);
	props.projectsResponse = {
		status: projectsList.status,
		body: projectsList.body,
	};

	return props;
};

export default Home;
