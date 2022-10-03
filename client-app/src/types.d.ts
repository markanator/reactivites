import { UseToastOptions } from "@chakra-ui/react";
export {};

declare global {
  interface Window {
    toast: (options?: UseToastOptions | undefined) => any;
    navigate: (url: string) => void;
  }
}
export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  attendees: Profile[];
  // client side additions
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
}

export interface ServerError {
  statusCode: number;
  message: string;
  details: string;
}

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}

export interface User {
  username: string;
  displayName: string;
  token: string;
  image?: string;
}
