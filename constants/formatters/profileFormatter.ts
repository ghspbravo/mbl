import Formatter from "./rootFormatter";
import pass from "../../assets/pass.png";
import moment from "moment";
import { Company } from "./companyFormatter";

export interface userInterface {
	id?: string;
	name?: string;
	photo?: string;
	birthday?: String;
	birthdayRaw?: string;
	roles?: { id: string; name: string }[];
	education?: string;
	companyId?: number;
	company?: Company;
	workList?: { name: string; start: string; startRaw: string; end: string; endRaw: string }[];
	socialLinks?: string[];
	spheresList?: { id: string; name: string }[];
	achievements?: string;
	interests?: string;
	wishes?: string;
}

export class ProfileFormatter extends Formatter {
	constructor() {
		super();
	}

	async formatUser(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			const {
				id,
				firstName,
				surName,
				middleName,
				birthDate,
				photo,
				workExperiences,
				socialNetWorks,
				profileTypes,
				achivements,
				wantToLearn,
				interests,
				education,
				skills,
				portfolio,
				companies,
			} = contents;
			const formattedWorkExperiences = workExperiences?.map((work) => ({
				name: work.name,
				start: moment(work.start).format("LL"),
				startRaw: moment(work.start).format("L"),
				end: work.end ? moment(work.end).format("LL") : null,
				endRaw: work.end ? moment(work.end).format("L") : null,
			}));

			this.body = {
				id,
				name: `${surName} ${firstName} ${middleName || ""}`.trimEnd(),
				photo: photo || pass,
				birthday: moment(birthDate).format("LL"),
				birthdayRaw: moment(birthDate).format("L"),
				roles: profileTypes || [],
				education,
				workList: formattedWorkExperiences,
				companyId: companies && companies[0],
				socialLinks: socialNetWorks || [],
				spheresList: skills || [],
				achievements: achivements,
				interests,
				wishes: wantToLearn,
			};
		});

		return {
			status: this.status,
			body: this.body,
		};
	}

	async editUser(fetchPromise: Promise<Response>) {
    await this.responseHandle(fetchPromise);

    return {
			status: this.status,
			body: this.body,
		};
	}
}
