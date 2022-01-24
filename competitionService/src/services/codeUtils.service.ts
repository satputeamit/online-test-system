import { exec } from "child_process";
import fs from "fs";
import util from 'util';


const _exec = util.promisify(exec);

async function executeCode(fileName: string) {
  console.log("code executing", fileName);

  var code = await _exec("python3 " + "./src/codeData/" + fileName);
  return code;
}

// executeCode("./hello.py")

function writeFile(fileName: string, content: string) {
  const flag = fs.writeFileSync("./src/codeData/" + fileName, content);
}

function getExt(language: string) {
  var ext = "";
  if (language.toLowerCase() == "python") {
    ext = "py";
  }
  return "." + ext;
}
export { executeCode, writeFile, getExt };


