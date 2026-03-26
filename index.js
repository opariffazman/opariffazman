const Mustache = require("mustache")
const fs = require("fs")

const MUSTACHE_MAIN_DIR = "./main.mustache"
const DATA_DIR = "./data.json"

function logoParam(item) {
  if (!item.logoSvg) return item.logo
  const name = item.label.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
  return `https://raw.githubusercontent.com/opariffazman/opariffazman/main/icons/${name}.svg`
}

function loadData() {
  const raw = JSON.parse(fs.readFileSync(DATA_DIR, "utf8"))

  // Build typing SVG URL
  const lines = raw.typingLines.map(l => encodeURIComponent(l)).join(";")
  const typingSvgUrl = `https://readme-typing-svg.demolab.com/?lines=${lines}&font=Fira+Code&size=22&duration=3000&pause=1000&color=FFFFFF&center=true&vCenter=true&width=800&height=50`

  // Build tech badge HTML
  const badgeHtml = raw.badges
    .map(b => {
      const logo = logoParam(b)
      return `<img src="https://img.shields.io/badge/${encodeURIComponent(b.label)}-000?style=flat-square&logo=${logo}&logoColor=white" alt="${b.label}" />`
    })
    .join("\n    ")

  // Build professional link badges
  const professionalHtml = raw.professionalLinks
    .map(l => {
      const logo = logoParam(l)
      return `<a href="${l.url}" target="_blank"><img src="https://img.shields.io/badge/${encodeURIComponent(l.label)}-000?style=flat-square&logo=${logo}&logoColor=${l.logoColor}" alt="${l.label}" /></a>`
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
      const logo = logoParam(l)
      return `<a href="${l.url}" target="_blank"><img src="https://img.shields.io/badge/${encodeURIComponent(l.label)}-000?style=flat-square&logo=${logo}&logoColor=${l.logoColor}" alt="${l.label}" /></a>`
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

function generateBadgesSvg(outFile) {
  const raw = JSON.parse(fs.readFileSync(DATA_DIR, "utf8"))
  const badges = raw.badges
  const badgeHeight = 22
  const badgeSpacing = 4
  const cols = 9
  const colWidth = 130
  const rows = Math.ceil(badges.length / cols)
  const svgWidth = cols * colWidth
  const svgHeight = rows * (badgeHeight + badgeSpacing) + badgeSpacing

  const badgeElements = badges.map((b, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = col * colWidth + badgeSpacing
    const y = row * (badgeHeight + badgeSpacing) + badgeSpacing
    const logoParam = b.logoSvg
      ? `data:image/svg+xml;base64,${Buffer.from(b.logoSvg).toString("base64")}`
      : b.logo
    const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(b.label)}-000?style=flat-square&amp;logo=${logoParam}&amp;logoColor=white`
    const delay = (i * 0.06).toFixed(2)
    return `    <foreignObject x="${x}" y="${y}" width="${colWidth - badgeSpacing}" height="${badgeHeight}" class="badge" style="animation-delay: ${delay}s">
      <img xmlns="http://www.w3.org/1999/xhtml" src="${badgeUrl}" height="${badgeHeight}" alt="${b.label}" />
    </foreignObject>`
  }).join("\n")

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
  <style>
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .badge {
      opacity: 0;
      animation: fadeIn 0.4s ease forwards;
    }
  </style>
${badgeElements}
</svg>`

  fs.writeFileSync(outFile, svg)
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
