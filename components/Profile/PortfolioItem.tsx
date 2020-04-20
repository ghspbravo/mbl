import React, { ReactElement } from "react";
import Link from "next/link";

interface Props {
	href: string;
	title: string;
	isCreator?: boolean;
}

export default function PortfolioItem({
	href,
	title,
	isCreator,
}: Props): ReactElement {
	return (
		<Link href={href}>
			<div className="portfolio-item">
				{title}
				<style jsx>{`
					.portfolio-item {
						padding: 10px 0;
					}
					.portfolio-item:hover {
						cursor: pointer;
						text-decoration: underline;
					}
				`}</style>
			</div>
		</Link>
	);
}
