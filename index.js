const Mustache = require("mustache")
const fs = require("fs")

const MUSTACHE_MAIN_DIR = "./main.mustache"
const DATA_DIR = "./data.json"

function loadData() {
  const raw = JSON.parse(fs.readFileSync(DATA_DIR, "utf8"))

  // Build typing SVG URL
  const lines = raw.typingLines.map(l => encodeURIComponent(l)).join(";")
  const typingSvgUrl = `https://readme-typing-svg.demolab.com/?lines=${lines}&font=Fira+Code&size=22&duration=3000&pause=1000&color=FFFFFF&center=true&vCenter=true&width=800&height=50`

  // Build tech badge HTML
  const badgeHtml = raw.badges
    .map(b => {
      const logoParam = b.logoSvg
        ? `data:image/svg+xml;base64,${Buffer.from(b.logoSvg).toString("base64")}`
        : b.logo
      return `<img src="https://img.shields.io/badge/${encodeURIComponent(b.label)}-000?style=flat-square&logo=${logoParam}&logoColor=white" alt="${b.label}" />`
    })
    .join("\n    ")

  // Build professional link badges
  const professionalHtml = raw.professionalLinks
    .map(l => {
      const logoParam = l.logoSvg
        ? `data:image/svg+xml;base64,${Buffer.from(l.logoSvg).toString("base64")}`
        : l.logo
      return `<a href="${l.url}" target="_blank"><img src="https://img.shields.io/badge/${encodeURIComponent(l.label)}-000?style=flat-square&logo=${logoParam}&logoColor=${l.logoColor}" alt="${l.label}" /></a>`
    })
    .join("\n    ")

  // Build featured project cards
  const projectHtml = raw.featuredProjects
    .map(p => {
      const [owner, repo] = p.repo.split("/")
      return `<a href="https://github.com/${p.repo}">
      <img src="https://github-readme-stats.vercel.app/api/pin/?username=${owner}&repo=${repo}&theme=highcontrast&hide_border=true&bg_color=000000" alt="${p.title}" />
    </a>`
    })
    .join("\n    ")

  // Build social link badges
  const socialHtml = raw.socialLinks
    .map(l => {
      const logoParam = l.logoSvg
        ? `data:image/svg+xml;base64,${Buffer.from(l.logoSvg).toString("base64")}`
        : l.logo
      return `<a href="${l.url}" target="_blank"><img src="https://img.shields.io/badge/${encodeURIComponent(l.label)}-000?style=flat-square&logo=${logoParam}&logoColor=${l.logoColor}" alt="${l.label}" /></a>`
    })
    .join("\n    ")

  // Activity graph URL
  const activityGraphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${raw.username}&theme=high-contrast&hide_border=true&bg_color=000000&color=FFFFFF&line=FFFFFF&point=FFFFFF&area=true&area_color=555555`

  // Profile view counter
  const viewCounterUrl = `https://komarev.com/ghpvc/?username=${raw.username}&style=flat-square&color=000000&label=views`

  return {
    ...raw,
    typingSvgUrl,
    badgeHtml,
    professionalHtml,
    projectHtml,
    socialHtml,
    activityGraphUrl,
    viewCounterUrl,
  }
}

function generateFile(outFile, isHtml) {
  const data = { ...loadData(), isHtml }
  const template = fs.readFileSync(MUSTACHE_MAIN_DIR, "utf8")
  const output = Mustache.render(template, data)
  fs.writeFileSync(outFile, output)
}

if (require.main === module) {
  generateFile("README.md", false)
  generateFile("index.html", true)
  console.log("Generated README.md and index.html")
}

module.exports = { generateFile }
