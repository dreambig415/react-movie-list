export const getItem = (keyName) =>  {
    return JSON.parse(localStorage.getItem(keyName));
};

export const setItem = (keyName, keyValue) => {
    let value = JSON.stringify(keyValue);
    try {
        return localStorage.setItem(keyName, value);
    } catch (error) {
        throw error;
    }
}

export const removeItem = (keyName) => {
    return localStorage.removeItem(keyName);
}

export const key = (keyName) => localStorage.key(keyName);

export const clear = () => localStorage.clear();
 