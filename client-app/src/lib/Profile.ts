import type { Photo, Profile as IProfile, User } from "~/types";

// only used to create an attendee
export default class Profile implements IProfile {
	username = "";
	displayName = "";
	image?: string | undefined;
	bio?: string | undefined;
	photos?: Photo[] | undefined;
	followersCount = 0;
	followingCount = 0;
	following = false;

	constructor(user: User) {
		this.username = user.username;
		this.displayName = user.displayName;
		this.image = user.image;
	}
}
