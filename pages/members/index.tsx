import React, { ReactElement, useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import Pages from "../../constants/pages";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Status } from "../../constants/formatters/rootFormatter";
import { fetcher, isoFetcher } from "../../constants/fetcher";
import Api from "../../constants/api";
import {
	MembersFormatter,
	shortMember,
} from "../../constants/formatters/membersFormatter";
import MemberItem from "../../components/Members/MemberItem";
import TabsContainer from "../../components/Tabs/TabsContainer";
import {
	CommonFormatter,
	UserRole,
} from "../../constants/formatters/commonFormatter";

interface Props {
	rolesList: UserRole[];
}

let currentPage = 0;
let currentRoleIndex = 0;

export default function Members({ rolesList }: Props): ReactElement {
	const [status, statusSet] = useState(Status.loading);
	const [message, messageSet] = useState("");
	let [membersList, membersListSet] = useState([]);
	const [hasNext, hasNextSet] = useState(false);

	const hasItems = status === Status.success;

	const fetchMembers = async () => {
		const params = {
			count: 16,
			page: ++currentPage,
		};
		const roleId = rolesList[currentRoleIndex]?.id;
		if (roleId > 0) {
			params["userType"] = roleId;
		}
		const membersResponse = fetcher.fetch(Api.MembersList, {
			params: params,
		});

		const membersFormatter = new MembersFormatter(),
			membersListResponse = await membersFormatter.formatList(membersResponse);

		if (membersListResponse.status > 0) {
			statusSet(membersListResponse.status);
			messageSet(membersListResponse.body);
		} else {
			statusSet(membersListResponse.status);
			membersListSet([...membersList, ...membersListResponse.body?.members]);
			hasNextSet(membersListResponse.body.hasNext);
		}
	};
	useEffect(() => {
		currentPage = 0;
		fetchMembers();
	}, []);

	const onLoadMoreHandler = () => {
		fetchMembers();
	};

	const clearState = () => {
    currentPage = 0;
    membersList = [];
		hasNextSet(false);
	};

	const onRoleChange = (roleIndex: number) => {
		if (currentRoleIndex === roleIndex) {
			return;
		}
    // this value uses in fetchMembers()
		currentRoleIndex = roleIndex;
		clearState();

		fetchMembers();
	};
	return (
		<Layout>
			<Head>
				<title>{Pages.Members.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs pages={[{ title: Pages.Members.title }]} />

					<h1>{Pages.Members.header}</h1>

					{rolesList?.length > 0 && (
						<div className="mb-5">
							<TabsContainer
								activeTab={0}
								names={rolesList.map((role) => role.name)}
								onTabChangeCallback={onRoleChange}
							/>
						</div>
					)}

					{hasItems ? (
						<div>
							{(membersList as shortMember[]).length > 0 ? (
								<div className="row">
									{(membersList as shortMember[]).map((item) => (
										<div key={item.id} className="col-sm-4 col-lg-3 col-6 mb-5">
											<MemberItem contents={item} />
										</div>
									))}
								</div>
							) : (
								<div>Нет участников</div>
							)}

							{hasNext && (
								<div onClick={onLoadMoreHandler} className="align-center">
									<button className="mx-auto">показать еще</button>
								</div>
							)}
						</div>
					) : (
						<div>
							{status === Status.loading ? "Загрузка участников..." : message}
						</div>
					)}
				</div>
			</section>
		</Layout>
	);
}

Members.getInitialProps = async (context) => {
	const rolesResponse = isoFetcher.fetch(Api.GetRoles);
	const commonFormatter = new CommonFormatter(),
		roles = await commonFormatter.formatRoles(rolesResponse);

	roles.body.unshift({ id: -1, name: "Все" });

	const props = {
		rolesList: roles.status > 0 ? [] : roles.body,
	};

	return props;
};
