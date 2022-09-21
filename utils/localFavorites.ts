const toggleFavorite = (id: number) => {
    let favorites = getFavorites();
    if (favorites.includes(id)) {
        favorites = favorites.filter((favorite: number) => favorite !== id);
    }
    else {
        favorites.push(id);
    }
    setFavorites(favorites);
};

const existsInFavorites = (id: number): boolean => {
    const favorites = getFavorites();
    return favorites.includes(id);
};

const getFavorites = (): number[] => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
        return JSON.parse(favorites);
    }
    return [];
}

const setFavorites = (favorites: number[]) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export default { toggleFavorite, existsInFavorites, getFavorites, setFavorites };