
export const useLocal = () => {
    const setItem = (key, item) => {
        localStorage.setItem(key, JSON.stringify(item));
    };

    const getItem = (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    };

    return {
        setItem,
        getItem
    }
}