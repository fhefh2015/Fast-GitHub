export const getObjectFromLocalStorage = function (key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function (value) {
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

const saveObjectInLocalStorage = function (obj) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set(obj, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

const defaultList = ["https://github.91chi.fun/github_proxy"];

export async function config() {
  const saveBtn = document.getElementById("save_btn");
  const list = document.getElementById("list");
  const customList = await getObjectFromLocalStorage("customList");

  if (customList && customList.length) {
    list.value = customList.join("\n");
  } else {
    list.value = defaultList.join("\n");
  }

  saveBtn.onclick = function () {
    const myList = list.value;
    console.log("list: ", myList);

    if (myList === "") {
      alert("不能为空");
      window.location.reload();
      return;
    }

    // saveObjectInLocalStorage({ "customURL": settingURL.value });
    saveObjectInLocalStorage({ "customList": myList.split("\n") });
    alert("已保存");
  }
}

