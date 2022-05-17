export interface IRegion {
	regionId: number
	region: string
}

export interface IRegions {
	regions: Array<IRegion>
}

// interface ITimeZone extends IRegion {
//     cities: string[];
// }

export interface INewUser {
	paymentMethodComplete: any;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	timezone: string;
	isCaptioner?: 0 | 1;
	isAdmin?: 0 | 1;
	respeakerRate?: number;
}

export interface IUserSettings {
	paymentMethodComplete: any;
	userId: number;
	timeZone: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface IUser extends INewUser {
	userId: number;
}

export interface IUserRow extends IUser {
	role: Array<'admin' | 'captioner' | 'viewer'>
}
