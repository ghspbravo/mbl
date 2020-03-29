import Formatter from "./rootFormatter";
import pass from "../../assets/pass.png";
import moment from "moment";

export interface userInterface {
	id?: string;
	name?: string;
	photo?: string;
	birthday?: Date;
	roles?: { id: string; name: string }[];
	education?: string;
	companies?: number[];
	workList?: { name: string; start: string; end: string }[];
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
		await this.responseHandle(fetchPromise).then(contents => {
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
			const formattedWorkExperiences = workExperiences?.map(work => ({
				name: work.name,
				start: moment(work.start).format("LL"),
				end: work.end ? moment(work.end).format("LL") : null,
			}));

			this.body = {
				id,
				name: `${surName} ${firstName} ${middleName || ""}`.trimEnd(),
				photo: photo || pass,
				birthday: moment(birthDate).format("LL"),
				roles: profileTypes || [],
				education,
				workList: formattedWorkExperiences,
				companies,
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
}
