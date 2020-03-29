import React, { ReactElement } from "react";
import TabsContainer from "../Tabs/TabsContainer";
import Pages from "../../constants/pages";
import { useRouter } from "next/router";

export enum profileTabs {
	profile = 0,
	events = 1,
}

interface Props {
	currentTab: number;
}

export default function ProfileNavigation({ currentTab }: Props): ReactElement {
	const router = useRouter();
	const onTabChange = (tabId: number) => {
		switch (tabId) {
			case 0:
				router.push(Pages.Profile.route);
				break;
			case 1:
				router.push(Pages.MyEvents.route);
				break;

			default:
				break;
		}
	};
	return (
		<TabsContainer
			activeTab={currentTab}
			names={[Pages.Profile.title, Pages.MyEvents.header]}
			customAction={onTabChange}
		/>
	);
}
