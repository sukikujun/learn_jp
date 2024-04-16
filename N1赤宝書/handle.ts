import { readFileSync } from "fs";
import * as path from "path";

const folder_path: string = "./わ";
const file_name: string = "わ.md";

const filePath: string = path.join(folder_path, file_name);

console.log(filePath);

const data: string = readFileSync(filePath, { encoding: "utf8" });
console.log(data);

const tangoArr: string[] = data.split("\n");
const reg: RegExp = /^\S/;
tangoArr
  .filter((_v, i) => i < 100)
  .forEach((line) => {
    console.log(line);
    console.log(reg.test(line));
    // wrap ruby tag
    if (reg.test(line)) {
      const reg0 = /([\p{sc=Han}々]+)([\p{sc=Hiragana}]+)/ug
      const reg1 = /([\p{sc=Katakana}ー]+)([a-zA-Z ・]+)/ug
      const reg2 = /　(\p{sc=Hiragana}+)/ug
      const reg3 = /\p{sc=Hiragana}/ug
      const res: string = 
        line.replace(reg0, "$1<rt>$2</rt>") // 平仮名処理
        .replace(reg1, '$1<rt>$2</rt>') // 片仮名処理
        .replace(reg2, '$1<rt></rt>') // 空白処理
        .replace(/<rt><\/rt>(　)/, '$1') // 余った<rt></rt>削除
        .replace(/([^　]+)/, '<ruby>$1</ruby>') // ruby タグラップ
        ; // 
      console.log(res);
    }
  });
