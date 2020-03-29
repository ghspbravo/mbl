import React, { ReactElement, useState } from "react";
import Tab from "./Tab";

interface Props {
	activeTab?: number;
	children?: any;
	customAction?: Function;
	names: string[];
}

export default function TabsContainer({
	activeTab = 0,
	children: tabs,
	customAction,
	names,
}: Props): ReactElement {
	const [currentTab, currentTabSet] = useState(activeTab);

	const tabChangeHandler = tabId => {
		if (customAction) {
			customAction(tabId);
		} else currentTabSet(tabId);
	};
	return (
		<div>
			<div className="tabs-container row no-gutters">
				{names.map((name, index) => (
					<Tab
						key={index}
						name={name}
						onClick={() => tabChangeHandler(index)}
						active={index === currentTab}
					></Tab>
				))}
			</div>

			{tabs && <div className="tabs-content mt-5">{tabs[currentTab]}</div>}
		</div>
	);
}
