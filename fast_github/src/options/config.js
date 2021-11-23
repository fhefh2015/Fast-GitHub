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

const defaultURL = "https://github.91chi.fun/";

export async function config() {
  const saveBtn = document.getElementById('save_btn');
  console.log(saveBtn);
  const settingURL = document.getElementById('customURL');
  const customURL = await getObjectFromLocalStorage('customURL');

  console.log("option customURL:", customURL);

  if (customURL) {
    settingURL.value = customURL;
  } else {
    settingURL.value = defaultURL;
  }

  saveBtn.onclick = function () {
    const url = settingURL.value;
    if (url === "") {
      alert("不能为空");
      window.location.reload();
      return;
    }

    saveObjectInLocalStorage({ "customURL": settingURL.value });
    alert("已保存");
  }
}

