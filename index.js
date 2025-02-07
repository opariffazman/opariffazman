// index.js
const Mustache = require("mustache")
const fs = require("fs")
const MUSTACHE_MAIN_DIR = "./main.mustache"

let DATA = {
  name: "opariffazman",
  nickname: "opsedar",
  discordUserId: "178370555072872449",
  nexusUserId: "16167329",
  date: new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "Asia/Singapore",
  }),
}

function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err
    const output = Mustache.render(data.toString(), DATA)
    fs.writeFileSync("README.md", output)
  })
}
generateReadMe()
