// index.js
const Mustache = require("mustache")
const fs = require("fs")
const MUSTACHE_MAIN_DIR = "./main.mustache"

let DATA = {
  isHtml: false,
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
  favicons: "<!DOCTYPE html>\n<html lang=\"en\">\n<!-- Favico -->\n<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"images/apple-touch-icon.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"images/favicon-32x32.png\">\n<link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"images/favicon-16x16.png\">\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<link rel=\"icon\" type=\"image/png\" href=\"data:image/png;base64,\">"
}

function generateFile(outFile, isHtml) {
  const data = { ...DATA, isHtml }
  fs.readFile(MUSTACHE_MAIN_DIR, (err, template) => {
    if (err) throw err
    const output = Mustache.render(template.toString(), data)
    fs.writeFileSync(outFile, output)
  })
}
generateFile("README.md", false)
