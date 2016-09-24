export function clear() {
    return new Promise((resolve, reject) => {
        try {
            window.localStorage.clear();
            resolve(null);
        } catch (err) {
            reject(err);
        }
    })
}

export function getItem(key: string) {
    return new Promise((resolve, reject) => {
        try {
            const value = window.localStorage.getItem(key);
            resolve(value);
        } catch (err) {
            reject(err);
        }
    });
}

export function removeItem(key: string) {
    return new Promise((resolve, reject) => {
        try {
            window.localStorage.removeItem(key);
            resolve(null);
        } catch (err) {
            reject(err);
        }
    });
}


export function setItem(key: string, value: string) {
    return new Promise((resolve, reject) => {
        try {
            window.localStorage.setItem(key, value);
            resolve(null);
        } catch (err) {
            reject(err);
        }
    });
}