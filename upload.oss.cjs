const path = require("path");
const fs = require("fs");
const ossConfig = require("./config/oss.cjs");
const OSS = require("ali-oss");
const DIST_PATH = path.join(__dirname, "/dist");
class UploadOss {
  client = null;
  constructor() {
    this.client = new OSS({
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
      region: ossConfig.region,
      bucket: ossConfig.bucket,
    });
    this.uploadDir(DIST_PATH);
  }
  async uploadDir(dir, prefix = "") {
    const docs = fs.readdirSync(dir);
    for (let index = 0; index < docs.length; index++) {
      const item = docs[index];
      const curr_src = path.join(dir, item);
      const fs_src = fs.statSync(curr_src);
      if (fs_src.isDirectory()) {
        await this.uploadDir(curr_src, item);
      } else {
        const rpath = prefix ? "/" : "";
        await this.client.put(`dist/${prefix}${rpath}${item}`, curr_src);
      }
    }
    console.log("上传成功");
  }
}
new UploadOss();
