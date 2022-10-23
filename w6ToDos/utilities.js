function qs(selectorName) {
    return document.querySelector(selectorName);
}

export function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function writeToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function bindTouch(selector, callback) { //called bindTouch because it used to be a touch project. This one 
    const element = qs(selector);
    element.addEventListener("click", callback);
}