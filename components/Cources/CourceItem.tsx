import React, { ReactElement } from "react";
import { shortCource } from "../../constants/formatters/courcesFormatter";
import Link from "next/link";
import Pages from "../../constants/pages";
import Colors from "../../constants/colors";
import Badge from "../Badge";

interface Props {
  content: shortCource;
}

export default function CourceItem({ content }: Props): ReactElement {
	const { id, title, duration, shortDescription } = content;
	return (
		<div className="cource-wrapper">
      <Badge>{duration}</Badge>
			<div className="cource">
				<div className="row flex-column align-items-center align-center">
					<h2>{title}</h2>
					<p>{shortDescription}</p>

					<Link href={Pages.Cources.route + `/${id}`}>
						<button>записаться</button>
					</Link>
				</div>
			</div>
			<style global jsx>{`
        .cource-item:nth-child(2n) .cource {
          background-color: ${Colors.Primary};
          color: white;
        }
        .cource-item:nth-child(2n) button {
          border-color: white;
          color: white;
        }
				.cource {
					position: relative;
					padding: 50px;
					background-color: white;
					height: 100%;
					color: ${Colors.Primary};
				}
				.cource-wrapper {
					height: 100%;
					padding: 20px;
					background-color: ${Colors.Primary};
				}
			`}</style>
		</div>
	);
}
