export const endebug = () => {
  if (process.env.NODE_ENV === "development") return;
  try {
    var a = ["r", "e", "g", "g", "u", "b", "e", "d"].reverse().join("");
    !(function e(n) {
      (1 !== ("" + n / n).length || 0 === n) && function() {}.constructor(a)(),
        e(++n);
    })(0);
  } catch (a) {
    setTimeout(endebug, 500);
  }
};
