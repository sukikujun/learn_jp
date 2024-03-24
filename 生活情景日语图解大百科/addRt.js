const fs = require("fs");
console.log(fs);

const path = "02/2-1 玄関.md";

const data = fs.readFileSync(path, { encoding: "utf-8" });
// console.log(data);

const b = data.split("\r\n");
let newFile = "";
b.forEach((s) => {
  if (s.indexOf("ruby") !== -1) {
    // 漢字にフリガナを設置
    const reg = /([\p{sc=Han}|\p{sc=Katakana}|ー]+)(\p{sc=Hiragana}+)/gu;
    // 漢字前の文字を処理
    const reg2 =
      /([、。　ー\da-zA-Z\p{sc=Katakana}\p{sc=Hiragana}]+)(\p{sc=Han}+)/gu;
    // カタカナに英文を設置
    const reg3 = /([\p{sc=Katakana}ー]+)([A-Za-z -]+)/gu;
    // カタカナ前の文字処理
    const reg4 = /([^>\p{sc=Katakana}ー])([\p{sc=Katakana}|ー]+<rt>)/gu;

    const newLine = s
      .replace(reg, "$1<rt>$2</rt>")
      .replace(reg3, "$1<rt>$2</rt>")
      .replace(reg2, "$1<rt></rt>$2")
      .replace(reg4, "$1<rt></rt>$2")
      .replaceAll("　", "");
    newFile += newLine;
  } else {
    newFile += s;
  }
  newFile += "\r\n";
});
// console.log(b);

fs.writeFileSync("./test2.md", newFile, { encoding: "utf-8" });

console.log("123".indexOf("4"));
