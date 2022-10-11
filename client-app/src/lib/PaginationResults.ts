import { PaginationHeader } from "~/types";

export class PaginationResults<T> {
	data: T;
	pagination: PaginationHeader;

	constructor(data: T, pagination: PaginationHeader) {
		this.data = data;
		this.pagination = pagination;
	}
}
