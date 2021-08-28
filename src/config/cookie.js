export const cookie = (name) => {
  return new Promise((resolve) => {
    window.chrome.runtime.sendMessage(
      {
        type: "getCookie",
        url: window.location.origin,
      },
      (res) => {
        resolve(name ? res[name] : res);
      }
    );
  });
};
