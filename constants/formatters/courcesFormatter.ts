import Formatter, { formatDate } from "./rootFormatter";
import pass from "../../assets/pass.png";

export interface shortCource {
	id: number;
}

export interface Cource {
	id: number;
}

export class CourcesFormatter extends Formatter {
	constructor() {
		super();
	}

	async createCource(fetchPromise: Promise<Response>) {
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
  
	async applyCource(fetchPromise: Promise<Response>) {
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
/*
	async courcesList(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then(contents => {
			if (this.status > 0) {
				return;
			}
			this.body = {
				hasNext: contents.isExistNextPage,
				events: contents.items.map(item => {
					const formatedItem: shortEvent = {
						id: item.id,
						title: item.title,
						photo: item.imagePreview || pass,

						shortDescription: item.announce,

						startDate: formatDate(item.startEvent),
						endDate: formatDate(item.endEvent),

						canApply: item.registrationIsAvailable,
					};
					return formatedItem;
				}),
			};
		});

		return {
			status: this.status,
			body: this.body,
		};
	}

	async eventSingle(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then(contents => {
			if (this.status > 0) {
				return;
			}
			const payload: Event = {
				id: contents.id,
				title: contents.title,
				photo: contents.imagePreview || pass,

				fullDescription: contents.content,
				contacts: contents.contacts,

				startDate: formatDate(contents.startEvent),
				endDate: formatDate(contents.endEvent),

				canApply: contents.registrationIsAvailable,
				isApplied: contents.alreadyRegistered,

				documents: contents.documents || [],
			};
			this.body = payload;
		});

		return {
			status: this.status,
			body: this.body,
		};
  }
  */
}

export default CourcesFormatter;
