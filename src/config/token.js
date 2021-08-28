import md5 from "js-md5";

export const token = () => {
  let duotu_token = localStorage.getItem("duotu_token");
  if (!duotu_token) {
    let option = {
      t: Date.now() || "",
      w: window.innerWidth || "",
      h: window.innerHeight || "",
      ln: window.navigator.language || "",
      rnd: Math.random(0, 10 ^ 4) || "",
      hf: window.location.href || "",
      b: window.navigator.userAgent || "",
    };
    duotu_token = md5(JSON.stringify(option));
    localStorage.setItem("duotu_token", duotu_token);
  }

  return duotu_token;
};
