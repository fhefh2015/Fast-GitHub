function setItem(obj) {
    chrome.storage.sync.set(obj);
    chrome.storage.local.set(obj);
}

function setItemByKey(key, value) {
    let obj = {};
    obj[key] = value;
    chrome.storage.sync.set(obj);
    chrome.storage.local.set(obj);
}

function getItem(obj, callback) {
    chrome.storage.sync.get(obj, callback);
}

function isUrl(url) {
    return /^https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+)/.test(url)
}

async function asyncGetItem(obj) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(obj, function (result) {
            if (result) {
                resolve(result[obj]);
            }
            reject(false);
        });
    });
}