const MOVIES_PER_PAGE = 20;

module.exports = (list, pageNum) => {
	const results = [];
	const maxId = pageNum * MOVIES_PER_PAGE;
	const minId = maxId - MOVIES_PER_PAGE;
	for (let i = minId; i < maxId && i < list.length; i++) {
		results.push(list[i]);
	}
	const totalPage = Math.floor(list.length / MOVIES_PER_PAGE) + 1;
	return { results, page: pageNum, total_pages: totalPage };
};
