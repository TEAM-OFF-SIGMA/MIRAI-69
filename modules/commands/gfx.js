var dev = "CHAND";
module.exports.config = {
  name: "gf",
  version: "1.0.1",
  hasPermssion: 0,
  credits: `${dev}`,
  description: "gfx banner",
  commandCategory: "banner",
  usages: "text",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const request = require('request');
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + `/cache/${event.threadID}_${event.senderID}.png`;
  let text = args.join(" ");
  if (!text) return api.sendMessage(`Wrong fomat\nUse: ${global.config.PREFIX}${this.config.name} text`, event.threadID, event.messageID);
  let getWanted = (
    await axios.get(`https://botapi.ch4nd.repl.co/api/canvas/gfx1?nama=${text}&apikey=BetaBotz`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};


