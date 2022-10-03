import type { Profile as IProfile, User } from "~/types";

// only used to create an attendee
export default class Profile implements IProfile {
  username: string = "";
  displayName: string = "";
  image?: string | undefined;
  bio?: string | undefined;

  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}
