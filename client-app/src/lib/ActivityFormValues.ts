export class ActivityFormValues {
	id?: string = undefined;
	title = "";
	category = "";
	description = "";
	date: Date | null = null;
	city = "";
	venue = "";

	constructor(activity?: ActivityFormValues) {
		if (activity) {
			this.id = activity.id;
			this.title = activity.title;
			this.category = activity.category;
			this.description = activity.description;
			this.date = activity.date;
			this.city = activity.city;
			this.venue = activity.venue;
		}
	}
}
