const fs = require("fs/promises");
const dateFormat = require("dateformat");
const EventEmitter = require("events");
// @desc    Logs request to console
class AttendanceLog extends EventEmitter {
  logger = (req, res, next) => {
    const filename = `AttendanceMonitoringLogs-[${dateFormat(
      new Date(),
      "yyyy-mm-dd"
    )}]`;

    const content = `${req.method} \n ${req.protocol}://${req.get("host")}${req.originalUrl} 
    request body: ${ JSON.stringify(req.body)} 
    \n request params : ${JSON.stringify(req.params)} 
    \n request query params : ${JSON.stringify(req.query)}
    \n response body: ${ JSON.stringify(req.body)} `;
    res.on("finish", () => {

    
  });

    this.saveFile(filename, content);
    next();
  };
  saveFile = async (filename, contents) => {
    const fileExists = await this.fileexists(`./logs/${filename}.txt`);
    if(fileExists)
    {
      await fs.appendFile(`./logs/${filename}.txt`, contents);

    }
    else{
      await fs.writeFile(`./logs/${filename}.txt`, contents);
    }

    //  await fs.writeFile(`./logs/${filename}.txt`, contents);
    this.emit("logCreated", {
      filename,
      contents,
    });
  };
  fileexists = async (path) => {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  };
}
// const logger = (req, res, next) => {
//     console.log(
//       `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
//     );
//     saveFile('test', 'asasa' )
//     next();
//   };
// const saveFile = async (filename, contents) => {
//   await fs.writeFile(`./logs/${filename}.txt`, contents);

//   console.log(
//       `Successfully saved file ${filename} containing ${contents}`
//   );

// };
module.exports = AttendanceLog;
