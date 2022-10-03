import type { Activity as IActivity, Profile } from "~/types";
import { ActivityFormValues } from "./ActivityFormValues";

export class Activity implements IActivity {
  id: string = "";
  title: string = "";
  date: Date | null = null;
  description: string = "";
  category: string = "";
  city: string = "";
  venue: string = "";
  hostUsername: string = "";
  isCancelled: boolean = false;
  attendees: Profile[] = [];
  isGoing: boolean = false;
  isHost: boolean = false;
  host?: Profile | undefined = undefined;

  constructor(init?: ActivityFormValues) {
    // populate activities that we can
    Object.assign(this, init);
  }
}
