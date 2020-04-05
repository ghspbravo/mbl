import React, { ReactElement } from "react";
import { shortProject } from "../../constants/formatters/projectsFormatter";
import Colors from "../../constants/colors";
import Link from "next/link";
import Pages from "../../constants/pages";

interface Props {
	content: shortProject;
}

export default function ProjectItem({ content }: Props): ReactElement {
	const { id, title, goal, organisator } = content;
	return (
		<Link href={Pages.Projects.route + `/${id}`}>
			<div className="project-wrapper">
				<h3>{title}</h3>
				<p>{goal}</p>
				<div className="mt-5">
					<div className="project__creator">
						Создатель: {organisator.shortTitle}
					</div>
				</div>

				<style jsx>{`
					.project-wrapper {
						background: #ffffff;
						border: 4px solid ${Colors.Primary};
            transition: background-color 0.3s ease-in;

						padding: 35px 30px;
					}
          .project-wrapper:hover {
            cursor: pointer;
            background-color: #cde1f5;
          }

					.project__creator {
						font-size: 14px;
						color: #2f3943;
					}
					@media (max-width: 576px) {
						.project__creator {
							font-size: 10px;
						}
					}
				`}</style>
			</div>
		</Link>
	);
}
