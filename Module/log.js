const fs = require("fs");
const Queue = require("./queue.js");
const path = require("path");
const { title } = require("process");

const PATH = path.resolve("/log");

function CreateLogFile(filePath, title)
{
  if(fs.existsSync(filePath) == true)
    return ;
  else
  {
    fs.writeFileSync(filePath, title);
  }
}


function WriteLog()
{
  let date = new Date();
  let filePath = __dirname + "/log" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + ".txt";
  let queue = new Queue();
  let isWrite = false;

  CreateLogFile(filePath, title)

  return async function(text){

    queue.enqueue(text)
    if(isWrite == true)
      return;
    else
    {
      await new Promise(() =>{
        isWrite = true;
        while( queue.peek() != null && isWrite == true)
        {
          let strText = queue.dequeue();
          fs.appendFileSync(filePath, strText);
        }
     }).then(() => {isWrite = false})
    }
  }
}

let fileCreate = WriteLog();
fileCreate("hi\n");