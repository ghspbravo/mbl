import Formatter from "./rootFormatter";
import pass from "../../assets/pass.png";
import { businessSizesList } from "../businessSize";

export interface shortCompany {
	id: number;
	photo: string;
	shortTitle: string;
}

export interface Company {
	id: number;
	photo: string;
	title: string;
	shortTitle: string;
	size: string;
	sizeRaw: number;

	creator: string;

	inn: string;
	membersCount: number;
	costValue: number;

	spheres: string;
	spheresRaw: {
		id: number;
		name: string;
	}[];

	email: string;
	phone: string;
	site: string;
}

export class CompanyFormatter extends Formatter {
	constructor() {
		super();
	}

	async createCompany(fetchPromise: Promise<Response>) {
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

	async companySingle(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			const creator = contents.createdBy;
			this.body = {
				id: contents.id,
				title: contents.fullName,
				shortTitle: contents.shortName,
				photo: contents.photo || pass,
				creator: `${creator.surName} ${creator.firstName} ${creator.middleName}`,
				sizeRaw: parseInt(contents.size || 0),

				spheres: (contents.occupations || []).map((item) => item.name).join(","),
				spheresRaw: contents.occupations || [],

				inn: contents.inn,
				membersCount: contents.employeeCount,
				costValue: contents.annualRevenue,

				email: contents.email,
				phone: contents.phone,
				site: contents.site,
			};
			// TODO: remove company size crunch
			const enumRegexp = /^\d$/;
			if (enumRegexp.test(contents.size)) {
				this.body["size"] = businessSizesList[contents.size].name;
			}
		});

		return {
			status: this.status,
			body: this.body,
		};
	}

	async companiesList(fetchPromise: Promise<Response>) {
		await this.responseHandle(fetchPromise).then((contents) => {
			if (this.status > 0) {
				return;
			}
			this.body = {
				hasNext: contents.isExistNextPage,
				companies: contents.items.map((item) => ({
					id: item.id,
					title: item.fullName,
					shortTitle: item.shortName,
					photo: item.photo || pass,
				})),
			};
		});

		return {
			status: this.status,
			body: this.body,
		};
	}
}

export default CompanyFormatter;
