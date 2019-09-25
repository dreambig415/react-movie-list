export const getItem = (keyName) =>  {
    try {
        return JSON.parse(localStorage.getItem(keyName));
    } catch (error) {
        console.warn("There are some errors in parsing JSON", error.message);
    }
};

export const setItem = (keyName, keyValue) => {
    let value = JSON.stringify(keyValue);
    try {
        return localStorage.setItem(keyName, value);
    } catch (error) {
        console.warn("There are some errors in parsing JSON", error.message);
    }
}

export const removeItem = (keyName) => {
    return localStorage.removeItem(keyName);
}

export const key = (keyName) => localStorage.key(keyName);

export const clear = () => localStorage.clear();
 