import { exec } from "child_process";
import fs from "fs";
import util from 'util';


const _exec = util.promisify(exec);

async function executeCode(fileName: string) {
  console.log("code executing", fileName);

  var code = await _exec("python3 " + "./src/codeData/" + fileName);
//   var code = await _exec("python3 " +fileName);
  console.log("d:",code)
  return code;
}

// executeCode("./hello.py")

function writeFile(fileName: string, content: string) {
  const flag = fs.writeFileSync("./src/codeData/" + fileName, content);
}

function writeFinalFile(fileName: string, content: string){
    const startContent = `import sys`
    const endContent = `if __name__=="__main__":
    ans = my_function(sys.argv[1])
    print(ans)`
    fs.writeFileSync("./src/codeData/ff_" + fileName, startContent);
    fs.appendFileSync("./src/codeData/ff_" + fileName,content)
    fs.appendFileSync("./src/codeData/ff_" + fileName, endContent);
}

function getExt(language: string) {
  var ext = "";
  if (language.toLowerCase() == "python") {
    ext = "py";
  }
  return "." + ext;
}
export { executeCode, writeFile, getExt,writeFinalFile };


