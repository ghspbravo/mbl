import Formatter, { formatDate } from "./rootFormatter";
import pass from "../../assets/pass.png";
import { shortCompany } from "./companyFormatter";

export interface shortCource {
	id: number;
	title: string;
	shortDescription: string;
	duration: string;
}

export interface Cource {
	id: number;
	title: string;
	duration: string;
	contacts: string;
	fullDescription: string;

	isApplied: boolean;
	canApply: boolean;

	organisator: shortCompany;
}

export class CourcesFormatter extends Formatter {
	constructor() {
		super();
	}

	async createCource(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
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
		await this.responseHandle(fetchPromise).then((contents) => {
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

	async courcesList(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			this.body = {
				hasNext: contents.isExistNextPage,
				events: contents.items.map((item) => {
					const formatedItem: shortCource = {
						id: item.id,
						title: item.title,

						shortDescription: item.announce,

						duration: item.duration + " дней",
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

	async courceSingle(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			const payload: Cource = {
				id: contents.id,
				title: contents.title,

				fullDescription: contents.content,
				contacts: contents.announce,

				duration: contents.duration + " дней",
				organisator: contents.contacts,

				canApply: contents.registrationIsAvailable,
				isApplied: contents.alreadyRegistered,
			};
			this.body = payload;
		});

		return {
			status: this.status,
			body: this.body,
		};
	}
}

export default CourcesFormatter;
