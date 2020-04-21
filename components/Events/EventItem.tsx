import React, { ReactElement } from "react";
import { shortEvent } from "../../constants/formatters/eventsFormatter";
import Link from "next/link";
import Pages from "../../constants/pages";
import Colors from "../../constants/colors";

interface Props {
	content: shortEvent;
}

export default function EventItem({ content }: Props): ReactElement {
	const {
		id,
		photo,
		title,
		shortDescription,
		startDate,
		endDate,
		canApply,
	} = content;
	return (
		<div className="event">
			<div className="event__photo">
				<img src={photo} alt="Фотография мероприятия" />
				<div className="event__dates">
					{startDate} / {endDate}
				</div>
			</div>
			<div className="event__content">
				<div className="event__contant-wrapper">
					<div>
						<h3 className="event__title">{title}</h3>
						<p className="event__description">{shortDescription}</p>
					</div>

					<div className="row no-gutters align-items-center">
						<Link href={Pages.Events.route + "/" + id}>
							<button className="event__more">подробнее</button>
						</Link>
						{canApply && (
							<div className="col registration-status">Регистрация открыта</div>
						)}
					</div>
				</div>
			</div>
			<style jsx>{`
				.event {
					height: 100%;
					display: flex;
					flex-direction: column;
				}
				.event__contant-wrapper {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.event__content {
					flex: 1 1;
					padding: 40px;
					background-color: white;
					border: 2px solid ${Colors.Primary};
				}
				.event__title,
				.event__description {
					color: ${Colors.Primary};
				}
        button.event__more {
					color: ${Colors.Primary};
          border-color: ${Colors.Primary};
				}
				.event__more,
				.registration-status {
					text-transform: uppercase;
				}
				.registration-status {
					text-align: right;
					color: ${Colors.Acsent};
				}
				.event__dates {
					position: absolute;
					text-align: center;
					bottom: 20px;
					left: -15px;
					width: 190px;
					background-color: ${Colors.Acsent};
					padding: 7px 8px;

					font-weight: bold;
					line-height: 1.5;
				}
				.event__photo {
					position: relative;
					background-color: ${Colors.Primary};
				}
				.event__photo img {
					height: 370px;
					width: auto;
					object-fit: cover;
				}
				@media (max-width: 576px) {
					.event__dates {
						width: 142px;
					}
					.event__photo img {
						height: 170px;
					}
					.event__more {
						min-width: 150px;
					}
				}
			`}</style>
		</div>
	);
}
