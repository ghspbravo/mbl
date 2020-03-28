import Formatter, { formatDate } from "./rootFormatter";
import pass from "../../assets/pass.png";

export interface shortEvent {
	id: number;
	photo: string;
	title: string;
	shortDescription: string;

	canApply: boolean;

	startDate: string;
	endDate: string;
}

export interface Event {
	id: number;
	photo: string;
	title: string;
	shortDescription: string;

	fullDescription: string;
	documents: string[];

	contacts: string;

	canApply: boolean;

	startDate: string;
	endDate: string;
}

export class EventsFormatter extends Formatter {
	constructor() {
		super();
	}

	async createEvent(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then(contents => {
			if (this.status > 0) {
				return;
			}
			this.body = contents;
		});

		return {
			status: this.status,
			body: this.body,
		};
	}

	async eventsList(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then(contents => {
			if (this.status > 0) {
				return;
			}
			this.body = {
				hasNext: contents.isExistNextPage,
				events: contents.items.map(item => {
					const formatedItem:shortEvent = {
						id: item.id,
						title: item.title,
            photo: item.imagePreview || pass,

            shortDescription: item.announce,

            startDate: formatDate(item.startEvent),
            endDate: formatDate(item.endEvent),

            canApply: item.registrationIsAvailable && !item.alreadyRegistered
          };
          return formatedItem
				}),
			};
		});

		return {
			status: this.status,
			body: this.body,
		};
	}
}

export default EventsFormatter;
