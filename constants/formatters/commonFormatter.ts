import Formatter from "./rootFormatter";

export interface statisticsInterface {
	members: string;
	companies: string;
	events: string;
	projects: string;
	cources: string;
}

export interface UserRole {
  id: number;
  name: string;
}
export class CommonFormatter extends Formatter {
	constructor() {
		super();
	}

	async formatRoles(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			this.body = contents;
		});

		return {
			status: this.status,
			body: this.body as UserRole[],
		};
	}

	async formatSkills(fetchPromise: Promise<Response>) {
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

	async formatStatistics(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			const payload: statisticsInterface = {
				members: contents.participantsCount,
				companies: contents.companyCount,
				projects: contents.projectCount,
				events: contents.eventCount,
				cources: contents.programCount,
			};

			this.body = payload;
		});

		return {
			status: this.status,
			body: this.body,
		};
	}
}
