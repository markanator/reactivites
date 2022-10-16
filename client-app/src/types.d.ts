import { UseToastOptions } from "@chakra-ui/react";

export interface PaginationHeader {
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;
	totalPages: number;
}

declare global {
	interface Window {
		toast: (options?: UseToastOptions | undefined) => unknown;
		navigate: (url: string) => void;
		FB: any;
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
	photos?: Photo[];
	followersCount: number;
	followingCount: number;
	following: boolean;
}

export interface Photo {
	id: string;
	url: string;
	isMain: boolean;
}

export interface User {
	username: string;
	displayName: string;
	token: string;
	image?: string;
}

export interface Comment {
	id: number;
	createdAt: Date;
	body: string;
	username: string;
	displayName: string;
	image?: string;
}

export interface UserActivity {
	id: string;
	title: string;
	category: string;
	date: Date;
}
