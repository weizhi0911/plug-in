import { urlId } from "@config/url.js";
import { getItemRelate } from "@api/marketing";
import { getItemVideo } from "@api/marketing";
import { getSelectedList } from "@api/marketing";

const option = {
  product_id: urlId,
};
getItemRelate({ ...option, type: 1 });
getItemRelate({ ...option, type: 2 });

getItemVideo(option);
getSelectedList(option);
