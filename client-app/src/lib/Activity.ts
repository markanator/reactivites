import type { Activity as IActivity, Profile } from "~/types";
import { ActivityFormValues } from "./ActivityFormValues";

export class Activity implements IActivity {
	id = "";
	title = "";
	date: Date | null = null;
	description = "";
	category = "";
	city = "";
	venue = "";
	hostUsername = "";
	isCancelled = false;
	attendees: Profile[] = [];
	isGoing = false;
	isHost = false;
	host?: Profile | undefined = undefined;

	constructor(init?: ActivityFormValues) {
		// populate activities that we can
		Object.assign(this, init);
	}
}
