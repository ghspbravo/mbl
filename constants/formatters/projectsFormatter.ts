import Formatter, { formatDate } from "./rootFormatter";
import pass from "../../assets/pass.png";
import { shortCompany } from "./companyFormatter";
import moment from "moment";

export interface shortProject {
	id: number;
	title: string;

	goal: string;
	description: string;

	organisator: any;
}

export interface Project {
	id: number;
	title: string;
	image: string;

	dateStart: string;

	goal: string;
	product: string;

	description: string;
	shortDescription: string;

	advantages: string;
	actuality: string;

	organisator: any;
}

export class ProjectsFormatter extends Formatter {
	constructor() {
		super();
	}

	async createProject(fetchPromise: Promise<Response>) {
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

	async ProjectsList(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			this.body = {
				hasNext: contents.isExistNextPage,
				projects: contents.items.map((item) => {
					const formatedItem: shortProject = {
						id: item.id,
						title: item.title,
						description: item.content,
						goal: item.projectObjective,
						organisator: {
							id: item.ownerCompany?.id,
							shortTitle: item.ownerCompany?.shortName,
							photo: item.ownerCompany?.logo || pass,
						},
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

	async projectSingle(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			const payload: Project = {
				id: contents.id,
				title: contents.title,

				description: contents.content,
				shortDescription: contents.shortDescription,

				dateStart: moment(contents.start).format("LL"),

				goal: contents.projectObjective,
				product: contents.projectProduct,

				image: contents.imagePath || contents.imagePreviewPath,

				advantages: contents.benefits,
				actuality: contents.relevance,

				organisator: {
					id: 0,
					shortTitle: contents.ownerCompanyName,
					photo: pass,
				},
			};
			this.body = payload;
		});

		return {
			status: this.status,
			body: this.body,
		};
	}
}

export default ProjectsFormatter;
