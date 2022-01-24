// import { exec } from "child_process";
// import util from "util";
import fs from "fs";
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const execd = util.promisify(exec);

async function executeCode(fileName: string) {

  var { error, stdout, stderr }  = await execd("python3 " + "hello.py");
 
  console.log("op:", stdout);
  console.log("ope:", stderr);
  return stderr
 
}


console.log("err",executeCode("g"))


