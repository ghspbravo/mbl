import Formatter, { formatDate } from "./rootFormatter";
import pass from "../../assets/pass.png";
import { shortCompany } from "./companyFormatter";

export interface shortProject {
	id: number;
	title: string;
  
  goal: string;
  description: string;
  
	organisator: shortCompany;
}

export interface Project {
	id: number;
	title: string;

  goal: string;
  description: string;
  
	organisator: shortCompany;
}

export class ProjectsFormatter extends Formatter {
	constructor() {
		super();
	}

	async createProject(fetchPromise: Promise<Response>) {
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
	async ProjectsList(fetchPromise: Promise<Response>) {
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

export default ProjectsFormatter;
