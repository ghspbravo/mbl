import React, { ReactElement } from "react";
import Link from "next/link";
import Pages from "../../constants/pages";
import { shortCompany } from "../../constants/formatters/companyFormatter";
import Lazy from "../Lazy";

interface Props {
	content: shortCompany;
}

export default function CompanyItem({ content }: Props): ReactElement {
	const { id, photo, shortTitle } = content;
	return (
		<Link passHref href={`${Pages.Companies.route}/${id}`}>
			<a className="clear">
				<Lazy>
					<img className="responsive mx-auto" src={photo} alt="Лого компании" />
				</Lazy>
				<div className="mt-2 align-center">{shortTitle}</div>
			</a>
		</Link>
	);
}
