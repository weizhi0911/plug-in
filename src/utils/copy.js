import ClipboardJS from "clipboard";
// import Message from '@archUtils/message'
// import { CopyOption } from '@globalType/index'
// import { Copy as InterfaceCopy } from '@bizInterface/index'
import Message from "@u/message";

// const message = new Message()

export default class Copy {
  // clipboard : null

  constructor(selector, option) {
    const config = option ? option["config"] : undefined;
    const successMsg = option ? option["successMsg"] : undefined;
    const errorMsg = option ? option["errorMsg"] : undefined;
    const e = option ? option["e"] : undefined;
    const callback = option ? option["callback"] : undefined;

    this.clipboard = new ClipboardJS(selector, config);

    successMsg === undefined
      ? this.success("复制成功", callback)
      : this.success(successMsg, callback);

    errorMsg === undefined ? this.error() : this.error(errorMsg);

    if (e && e.target) {
      e.target["click"]();
    }
  }

  success(msg, callback) {
    this.clipboard.on("success", (e) => {
      callback && callback();
      Message(msg);
      this.clear(e);
    });
  }

  error(
    msg = "由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！"
  ) {
    this.clipboard.on("error", (e) => {
      Message(msg);
      this.clear(e);
    });
  }

  clear(e) {
    e["clearSelection"]();
    this.clipboard.destroy();
  }
}
