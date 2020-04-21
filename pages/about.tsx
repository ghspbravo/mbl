import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Pages from "../constants/pages";
import Colors from "../constants/colors";
import studentsImage from "../assets/students.png";
import partnersImage from "../assets/partners.png";
import Icon from "../components/Icon";

interface Props {}

export default function About({}: Props): ReactElement {
	return (
		<Layout>
			<Head>
				<title>{Pages.About.title}</title>
			</Head>

			<section>
				<div className="container">
					<div className="col-lg-8 mx-auto">
						<h1>{Pages.About.header}</h1>
						<p>
							Молодежная бизнес лига (МБЛ) — это сообщество молодых талантов и
							предпринимателей, которые учатся, обмениваются идеями и знаниями,
							стремятся изменять мир к лучшему.
						</p>
						<p>
							Если тебе от 14 до 28 лет и ты хочешь участвовать в преобразовании
							мира, то Молодежная бизнес лига — это для тебя! Образовательные
							практики для развития креативности, деловых качеств,
							организаторских способностей и навыков эффективного общения.
						</p>
						<p>
							Ты будешь знать о всех важных событиях, общаться с интересными
							людьми, решать реальные кейсы и зарабатывать.
						</p>
					</div>
				</div>
			</section>

			<section className="inverted">
				<div className="container">
					<div className="col-lg-8 mx-auto">
						<h2>Лига предлагает</h2>
						<div className="suggest-list">
							<div className="suggest-item mb-3 row">
								<div className="col-sm-1 col-2">
									<div className="suggest-number">1</div>
								</div>
								<div className="col suggest-text">
									Информацию о программах и мероприятиях  в Екатеринбурге и
									Свердловской области.
								</div>
							</div>
							<div className="suggest-item mb-3 row">
								<div className="col-sm-1 col-2">
									<div className="suggest-number">2</div>
								</div>
								<div className="col suggest-text">
									Интенсивное обучение — семинары, лектории, деловые и ролевые
									игры и пр.
								</div>
							</div>
							<div className="suggest-item mb-3 row">
								<div className="col-sm-1 col-2">
									<div className="suggest-number">3</div>
								</div>
								<div className="col suggest-text">
									Погружение в деловую среду: профориентация и трудоустройство.
								</div>
							</div>
							<div className="suggest-item mb-3 row">
								<div className="col-sm-1 col-2">
									<div className="suggest-number">4</div>
								</div>
								<div className="col suggest-text">
									Встречи с успешными деловыми людьми.
								</div>
							</div>
							<div className="suggest-item mb-3 row">
								<div className="col-sm-1 col-2">
									<div className="suggest-number">5</div>
								</div>
								<div className="col suggest-text">
									Сопровождение стартапов, помощь в разработке бизнес-проектов.
								</div>
							</div>
						</div>
						<style jsx>{`
							.suggest-number {
								display: inline-block;
								border-radius: 50%;
								padding: 7px 13px;
								background-color: ${Colors.Acsent};
								text-align: center;
							}
						`}</style>
					</div>
				</div>
			</section>

			<section className="bg-section">
				<div className="container">
					<div className="motivation">
						Меняем
						<br /> Будущее
						<br /> к Лучшему
					</div>
				</div>

				<style jsx>{`
					.container {
						position: relative;
						height: 100%;
					}
					.bg-section {
						height: 677px;
						width: 100%;
						padding: 0;
						background-image: url(${studentsImage});
						background-size: cover;
						background-position: center;
					}
					.motivation {
						width: 406px;
						height: 406px;
						display: flex;
						align-items: center;
						justify-content: center;
						color: white;
						background-color: rgba(204, 235, 5, 0.85);

						position: absolute;
						bottom: -80px;
						left: 0;

						font-size: 40px;
						line-height: 120%;

						border-radius: 50%;
					}

					@media screen and (max-width: 768px) {
						.bg-section {
							height: 224px;
						}
						.motivation {
							width: 131px;
							height: 131px;
							font-size: 14px;

							bottom: -30px;
						}
					}
				`}</style>
			</section>

			<section>
				<h1 className="align-center">Партнеры</h1>
				<img
					className="responsive"
					style={{ objectFit: "contain" }}
					src={partnersImage}
					alt="Партнеры"
				/>
			</section>

			<section>
				<h1 className="align-center">Контакты</h1>
				<div className="row no-gutters justify-content-center align-items-center">
					<div className="bell-icon">
						<Icon color="white" size={25} name={"ei-bell"} />
					</div>
					<a className="clear ml-1" href="tel:83433618887">
						+7 (343)361-88-87
					</a>
					<style jsx>{`
						.bell-icon {
							padding: 2px 4px;
							background-color: ${Colors.Primary};
							border-radius: 50%;
						}
					`}</style>
				</div>
			</section>
		</Layout>
	);
}
