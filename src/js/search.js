export class Search {

    get currentPageNumber() {
        return this.currentPage;
    }

    setCurrentPageValue(pageNumber) {
        this.currentPage = pageNumber;
    }

    constructor(log, api, view) {
        this.log = log;
        this.api = api;
        this.view = view;
        this.view.searchInput.addEventListener('keyup', this.debounce(this.searchRepos.bind(this), 500));
        this.view.loadMore.addEventListener('click', this.loadMoreRepos.bind(this));
        this.currentPage = 1;
    }

    searchRepos() {
        this.setCurrentPageValue(1);
        if (this.view.searchInput.value) {
            this.api.loadRepos(this.view.searchInput.value, this.currentPageNumber).then(response => this.updateRepos(response))
        } else {
            this.view.clearRepos();
            this.view.setRepoCounter('');
        }
    }

    loadMoreRepos() {
        this.setCurrentPageValue(this.currentPage + 1);
        this.api.loadRepos(this.view.searchInput.value, this.currentPageNumber).then(response => this.updateRepos(response, true))
    }

    updateRepos(response, isUpdate = false) {
        let repos;
        let reposCount;
        if (response.ok) {
            if (!isUpdate) {
                // Если новый поиск а не подгрузка, то очищаем ранее найденных пользователей
                this.view.clearRepos();
            }
            response.json().then((res) => {
                if (res.items) {
                    repos = res.items;
                    reposCount = res.total_count;
                    this.view.toggleStateLoadMoreButton(reposCount > 10 && repos.length * this.currentPageNumber !== reposCount);
                    repos.forEach(user => this.view.createRepo(user));
                } else {
                    this.view.clearRepos();
                }
                this.view.setRepoCounter(this.log.counterMessage(reposCount));
            });
        } else {
            console.log('Error 1' + response.status);
        }
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}
