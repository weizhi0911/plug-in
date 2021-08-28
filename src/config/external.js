const url = [
  "//at.alicdn.com/t/font_2379559_u9212fp40z9.js",
];

url.map((item) => {
  const head = document.getElementsByTagName("head")[0],
    jsURL = item,
    scriptTag = document.createElement("script");
  scriptTag.src = jsURL;

  head.appendChild(scriptTag);
});
