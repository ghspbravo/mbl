import React, { ReactElement } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";

import Pages from "../../constants/pages";
import Tag from "../../components/Tag";
import Link from "next/link";
import ProfileNavigation, {
	profileTabs,
} from "../../components/Profile/ProfileNavigation";
import useUser from "../../constants/hooks/useUser";
import { link } from "fs";

interface Props {}

export default function Login({}: Props): ReactElement {
	const currentUser = useUser();

	const buttons = () => (
		<div>
			<Link href={Pages.CreateEvent.route}>
				<div className="mt-3">
					<button className="p-relative primary w-100">
						создать мероприятие
					</button>
				</div>
			</Link>
			<Link href={Pages.CreateCource.route}>
				<div className="mt-3">
					<button className="p-relative primary w-100">
						создать программу
					</button>
				</div>
			</Link>
			<Link href={Pages.CreateProject.route}>
				<div className="mt-3">
					<button className="p-relative primary w-100">создать проект</button>
				</div>
			</Link>
			{currentUser.companyId ? (
				<Link href={Pages.CompanyEdit.route}>
					<div className="mt-3">
						<button className="p-relative w-100">редактировать компанию</button>
					</div>
				</Link>
			) : (
				<Link href={Pages.CreateCompany.route}>
					<div className="mt-3">
						<button className="p-relative primary w-100">
							привязать компанию
						</button>
					</div>
				</Link>
			)}
			<Link href={Pages.ProfileEdit.route}>
				<div className="mt-3">
					<button className="p-relative w-100">редактировать профиль</button>
				</div>
			</Link>
		</div>
	);

	return (
		<Layout>
			<Head>
				<title>{Pages.Profile.title}</title>
			</Head>

			<section>
				<div className="container">
					<h1 className="m-align-center">{Pages.Profile.header}</h1>

					<div className="my-5">
						<ProfileNavigation currentTab={profileTabs.profile} />
					</div>

					<div className="row">
						<div className="d-none d-lg-block col-lg-4">
							<img
								className="responsive"
								src={currentUser.photo}
								alt="Фотография человека"
							/>

							<div className="mt-4">{buttons()}</div>
						</div>
						<div className="col-lg-8">
							<h1>{currentUser.name}</h1>

							<div className="row no-gutters mb-5">
								<div className="mb-2">
									{currentUser.roles?.map((role) => (
										<div key={role.id} className="mr-2">
											<Tag>{role.name}</Tag>
										</div>
									))}
								</div>
							</div>

							<div className="d-lg-none mb-4">
								<img
									className="responsive mx-auto"
									style={{ maxWidth: "350px" }}
									src={currentUser.photo}
									alt="Фотография человека"
								/>
							</div>

							{currentUser.companyId && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Компания:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.company.shortTitle}
									</div>
								</div>
							)}
							{currentUser.birthday && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Дата рождения:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.birthday}
									</div>
								</div>
							)}
							{currentUser.phone && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Телефон:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.phone}
									</div>
								</div>
							)}
							{currentUser.education && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Место учебы:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.education}
									</div>
								</div>
							)}
							{currentUser.workList?.length > 0 && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Место работы:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.workList.map((work, index) => (
											<div key={index}>
												{`${work.name}, ${
													work.end
														? `${work.start} – ${work.end}`
														: `с ${work.start}`
												}`}
											</div>
										))}
									</div>
								</div>
							)}
							{currentUser.spheresList?.length > 0 && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Интересы:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.spheresList
											.map((sphere) => sphere.name)
											.join(",")}
									</div>
								</div>
							)}
							{currentUser.interests && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Навыки:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.interests}
									</div>
								</div>
							)}
							{currentUser.achievements && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Интересы и достижения:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.achievements}
									</div>
								</div>
							)}
							{currentUser?.socialLinks?.length > 0 && (
								<div className="row mb-3">
									<div className="col-lg-4 col-xl-3 col-md-6 text">
										<b>Социальные сети:</b>
									</div>
									<div className="col-lg-8 col-xl-9 col-md-6 text">
										{currentUser.socialLinks.map((link, index) => (
											<a key={index} target="_blank" href={link}>
												{link}
											</a>
										))}
									</div>
								</div>
							)}

							<div className="d-lg-none">{buttons()}</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
