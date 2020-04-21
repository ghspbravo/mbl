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
import {
	CommonFormatter,
	statisticsInterface,
} from "../constants/formatters/commonFormatter";

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
	statisticsResponse: {
		status: number;
		body: statisticsInterface;
	};
}

function Home({
	newsResponse,
	eventsResponse,
	courcesResponse,
	membersResponse,
	companiesResponse,
	projectsResponse,
	statisticsResponse,
}: Props) {
	const events = eventsResponse.body?.events;
	const news = newsResponse.body?.news;
	const cources = courcesResponse.body?.cources;
	const members = membersResponse.body?.members;
	const companies = companiesResponse.body?.companies;
	const projects = projectsResponse.body?.projects;
	const statistics = statisticsResponse.body;
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
					<h1>МБЛ в цифрах</h1>

					<div className="statistics">
						<div className="circle circle-members">
							<div className="number">{statistics.members}</div>
							<div className="label">участников</div>
						</div>
						<div className="circle circle-companies">
							<div className="number">{statistics.companies}</div>
							<div className="label">компании</div>
						</div>
						<div className="circle circle-events">
							<div className="number">{statistics.events}</div>
							<div className="label">мероприятия</div>
						</div>
						<div className="circle circle-projects">
							<div className="number">{statistics.projects}</div>
							<div className="label">проектов</div>
						</div>
						<div className="circle circle-cources">
							<div className="number">{statistics.cources}</div>
							<div className="label">программ</div>
						</div>

						<style jsx>{`
							.statistics {
								position: relative;
								width: 100%;
								min-height: 600px;
							}
							.circle {
								position: absolute;
								border-radius: 50%;
								background-color: ${Colors.Primary};
								color: white;
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
							}
							.number {
								font-weight: bold;
							}
							.circle-members {
								bottom: 20px;
								left: 20px;
								width: 350px;
								height: 350px;
							}
							.circle-members .number {
								font-size: 120px;
							}
							.circle-members .label {
								font-size: 30px;
							}
							.circle-companies {
								top: 20px;
								left: 380px;
								width: 245px;
								height: 245px;
							}
							.circle-companies .number {
								font-size: 72px;
							}
							.circle-companies .label {
								font-size: 20px;
							}
							.circle-events {
								bottom: 50px;
								left: 540px;
								width: 175px;
								height: 175px;
							}
							.circle-events .number {
								font-size: 56px;
							}
							.circle-events .label {
								font-size: 14px;
							}
							.circle-projects {
								top: 0px;
								right: 0px;
								width: 285px;
								height: 285px;
							}
							.circle-projects .number {
								font-size: 84px;
							}
							.circle-projects .label {
								font-size: 20px;
							}
							.circle-cources {
								top: 360px;
								right: 90px;
								width: 133px;
								height: 133px;
							}
							.circle-cources .number {
								font-size: 36px;
							}
							.circle-cources .label {
								font-size: 12px;
							}
							@media screen and (max-width: 992px) {
								.statistics {
									min-height: 340px;
								}
								.circle-members {
									bottom: 100px;
									left: 20px;
									width: 147px;
									height: 147px;
								}
								.circle-members .number {
									font-size: 48px;
								}
								.circle-members .label {
									font-size: 14px;
								}
								.circle-companies {
									top: 180px;
									left: 170px;
									width: 96px;
									height: 96px;
								}
								.circle-companies .number {
									font-size: 28px;
								}
								.circle-companies .label {
									font-size: 10px;
								}
								.circle-events {
									bottom: 0px;
									left: 70px;
									width: 79px;
									height: 79px;
								}
								.circle-events .number {
									font-size: 24px;
								}
								.circle-events .label {
									font-size: 8px;
								}
								.circle-projects {
									top: 50px;
									left: 180px;
									width: 107px;
									height: 107px;
								}
								.circle-projects .number {
									font-size: 36px;
								}
								.circle-projects .label {
									font-size: 10px;
								}
								.circle-cources {
									top: 10px;
									left: 110px;
									width: 63px;
									height: 63px;
								}
								.circle-cources .number {
									font-size: 20px;
								}
								.circle-cources .label {
									font-size: 8px;
								}
							}
						`}</style>
					</div>
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

	const statisticsResponse = isoFetcher.fetch(Api.GetStatistics);
	const commonFormatter = new CommonFormatter(),
		statistics = await commonFormatter.formatStatistics(statisticsResponse);
	props.statisticsResponse = {
		status: statistics.status,
		body: statistics.body,
	};

	return props;
};

export default Home;
