export class PaginationParams {
	pageNumber: number;
	pageSize: number;

	constructor(pageNum = 1, pageSize = 5) {
		this.pageNumber = pageNum;
		this.pageSize = pageSize;
	}
}
