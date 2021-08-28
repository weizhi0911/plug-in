import Message from "@u/message";
import { runtimeSendMessage } from "@u/common.js";

export default class CopyImage {
  constructor(imgurl, option) {
    this.successMsg = option ? option["successMsg"] : undefined;
    this.errorMsg = option ? option["errorMsg"] : undefined;
    this.successCallblack = option ? option["success"] : undefined;
    this.errorCallblack = option ? option["error"] : undefined;

    this.init(imgurl);
  }

  async init(imgurl) {
    let base64Data = null;
    base64Data = await this.getBase64Image(imgurl);

    this.Copying(base64Data);
  }

  async getBase64Image(imgObj) {
    const data = await runtimeSendMessage("File", imgObj, { type: "copy" }, "");
    return data.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, "");
  }

  // getBase64Image(imgObj) {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = imgObj.width;
  //   canvas.height = imgObj.height;

  //   let ctx = canvas.getContext("2d");
  //   ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);
  //   const ext = imgObj.src
  //     .substring(imgObj.src.lastIndexOf(".") + 1)
  //     .toLowerCase();
  //   const dataURL = canvas.toDataURL("image/" + ext);
  //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // }

  Copying(base64Data) {
    try {
      const blobInput = this.convertBase64ToBlob(base64Data, "image/png");
      const ClipboardItem = window.ClipboardItem;
      const clipboardItemInput = new ClipboardItem({
        "image/png": blobInput,
      });

      window.navigator.clipboard.write([clipboardItemInput]);
      // Message("复制成功");
      this.successMsg === undefined
        ? this.success("复制成功", this.successCallblack)
        : this.success(this.successMsg, this.successCallblack);
    } catch (e) {
      // Message("复制失败");
      this.errorMsg === undefined
        ? this.error("复制失败", this.errorCallblack)
        : this.error(this.errorMsg, this.errorCallblack);
      console.log(e);
    }
  }

  convertBase64ToBlob(base64, type) {
    const bytes = window.atob(base64);

    const ab = new ArrayBuffer(bytes.length);

    const ia = new Uint8Array(ab);

    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], { type: type });
  }

  success(msg = "复制成功", callback) {
    callback && callback();
    Message(msg);
  }

  error(msg = "复制失败", callback) {
    callback && callback();
    Message(msg);
  }
}
