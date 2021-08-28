export const toMonthDay = (date, symbol = ".") => {
  const transferDate =
    typeof date !== "string" ? date : date ? new Date(date) : new Date();
  const month = String(transferDate.getMonth() + 1).padStart(2, "0");
  const day = String(transferDate.getDate()).padStart(2, "0");

  return [month, day].join(symbol);
};

export const toDate = (date, symbol = "-") => {
  const transferDate =
    typeof date !== "string" ? date : date ? new Date(date) : new Date();

  const year = transferDate.getFullYear();
  const month = String(transferDate.getMonth() + 1).padStart(2, "0");
  const day = String(transferDate.getDate()).padStart(2, "0");

  return [year, month, day].join(symbol);
};
