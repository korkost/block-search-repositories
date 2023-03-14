export class VIEW {
    constructor(api) {
        this.api = api;

        this.app = document.getElementById('app');

        this.mainContent = this.createElement('div', 'main');

        this.reposListWrapper = this.createElement('div', 'repos-wrapper');
        this.reposList = this.createElement('ul', 'repos');
        this.reposListWrapper.append(this.reposList);

        this.searchLine = this.createElement('div', 'search-line');
        this.searchInput = this.createElement('input', 'search-input');
        this.searchInput.placeholder = "Github Search repositories...";
        this.reposCounter = this.createElement('span', 'counter');
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.reposCounter);

        this.loadMore = this.createElement('button', 'btn');
        this.loadMore.textContent = 'Загрузить еще';
        this.loadMore.style.display = 'none';
        this.reposListWrapper.append(this.loadMore);

        this.app.append(this.searchLine);
        this.mainContent.append(this.reposListWrapper);
        this.app.append(this.mainContent);
    }

    createElement(elementName, className) {
        const element = document.createElement(elementName);
        if (className) {
            element.classList.add(className)
        }
        return element;
    }

    createRepo(repoData) {
        const repo = this.createElement('li', 'repo-prev');
        repo.addEventListener('click', () => this.showRepo(repoData));
        repo.innerHTML = `<a class="repo-full-name" target="_blank "href="${repoData.html_url}">name:${repoData.full_name}</a>
                          <span class="repo-prev-name">id:${repoData.id}</span>
                          <span class="repo-prev-name">updated:${repoData.updated_at}</span>`;
        this.reposList.append(repo);
    }

    clearRepos() {
        this.reposList.innerHTML = '';
    }

    setRepoCounter(message) {
        this.reposCounter.textContent = message
    }

    toggleStateLoadMoreButton(show) {
        this.loadMore.style.display = show ? 'block' : 'none';
    }
}
