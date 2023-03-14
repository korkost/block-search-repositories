export class LOG {
    constructor() {
    }

    counterMessage(reposCount) {
        if (reposCount % 10 === 1 && reposCount % 100 !== 11) {
            return 'Найден 1 репозиторий';
        } else if (reposCount % 10 >= 2 && reposCount % 10 <= 4 && (reposCount % 100 < 10 || reposCount % 100 >= 20)) {
            return `Найдено ${reposCount} репозитория`;
        } else if (reposCount === 0) {
            return 'По вашему запросу пользователей не найдено';
        } else {
            return `Найдено ${reposCount} репозиториев`;
        }
    }
}
