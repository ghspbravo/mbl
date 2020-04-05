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
  
	async ProjectsList(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then(contents => {
			if (this.status > 0) {
				return;
			}
			this.body = {
				hasNext: contents.isExistNextPage,
				events: contents.items.map(item => {
					const formatedItem: shortProject = {
						id: item.id,
						title: item.title,
            description: item.content,
            goal: item.projectObjective,
            organisator: {
              id: item.ownerCompany?.id,
              shortTitle: item.ownerCompany?.shortName,
              photo: item.ownerCompany?.logo || pass,
            }
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
		await this.responseHandle(fetchPromise).then(contents => {
			if (this.status > 0) {
				return;
			}
			const payload: Project = {
				id: contents.id,
				title: contents.title,
        description: contents.content,
        goal: contents.projectObjective,
        organisator: {
          id: 0, shortTitle: contents.ownerCompanyName, photo: pass
        }
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
