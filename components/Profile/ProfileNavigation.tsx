import React, { ReactElement } from "react";
import TabsContainer from "../Tabs/TabsContainer";
import Pages from "../../constants/pages";
import { useRouter } from "next/router";

export enum profileTabs {
	profile = 0,
	events = 1,
	cources = 2,
	projects = 3,
}

interface Props {
	currentTab: number;
}

export default function ProfileNavigation({ currentTab }: Props): ReactElement {
	const router = useRouter();
	const onTabChange = (tabId: number) => {
		switch (tabId) {
			case profileTabs.profile:
				router.push(Pages.Profile.route);
				break;
			case profileTabs.events:
				router.push(Pages.MyEvents.route);
				break;
			case profileTabs.cources:
				router.push(Pages.MyCources.route);
				break;
			case profileTabs.projects:
				router.push(Pages.MyProjects.route);
				break;

			default:
				break;
		}
	};
	return (
		<TabsContainer
			activeTab={currentTab}
			names={[
				Pages.Profile.title,
				Pages.MyEvents.header,
				Pages.MyCources.header,
				Pages.MyProjects.header,
			]}
			customAction={onTabChange}
		/>
	);
}
