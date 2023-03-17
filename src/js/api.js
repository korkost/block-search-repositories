const REPOS_PER_PAGE = 10;
const URL = 'https://api.github.com/';

export class API {
    requests;

    constructor() {
    }

    async loadRepos(searchValue, page) {
        return await fetch(`${URL}search/repositories?q=${searchValue}&per_page=${REPOS_PER_PAGE}&page=${page}`);
    }

    async loadRepoData(user) {
        return Promise.all(this.requests)
            .then(responses => Promise.all(responses.map(r => r.json())))
    }
}
