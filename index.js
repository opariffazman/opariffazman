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

function iconSlug(item) {
  return item.label.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
}

function loadIconSvgContent(item) {
  const name = iconSlug(item)
  const path = `./icons/${name}.svg`
  if (!fs.existsSync(path)) return ""
  let svg = fs.readFileSync(path, "utf8")
  const vbMatch = svg.match(/viewBox="([^"]*)"/)
  const vb = vbMatch ? vbMatch[1] : "0 0 24 24"
  const svgTag = svg.match(/<svg[^>]*>/)?.[0] || ""
  const inner = svg.replace(/<\?xml[^?]*\?>/g, "").replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "").replace(/<title>[^<]*<\/title>/, "").trim()
  const isStroke = svgTag.includes('fill="none"') && inner.includes('stroke=')
  return { viewBox: vb, inner, isStroke }
}

function generateBadgesSvg(outFile) {
  const raw = JSON.parse(fs.readFileSync(DATA_DIR, "utf8"))
  const badges = raw.badges
  const iconSize = 36
  const fontSize = 31
  const padX = 20
  const padY = 13
  const badgeHeight = 62
  const gapX = 12
  const gapY = 12
  const maxWidth = 1400

  // Measure approximate badge widths and lay them out in rows
  const badgeData = badges.map(b => {
    const textWidth = b.label.length * 17
    const width = padX + iconSize + 8 + textWidth + padX
    return { ...b, width: Math.ceil(width) }
  })

  // Flow layout: wrap rows
  const rows = []
  let currentRow = []
  let rowWidth = 0
  for (const b of badgeData) {
    if (rowWidth + b.width + gapX > maxWidth && currentRow.length > 0) {
      rows.push(currentRow)
      currentRow = []
      rowWidth = 0
    }
    currentRow.push(b)
    rowWidth += b.width + gapX
  }
  if (currentRow.length > 0) rows.push(currentRow)

  const svgHeight = rows.length * (badgeHeight + gapY) + gapY
  let badgeIdx = 0
  const elements = []

  rows.forEach((row, ri) => {
    // Center row
    const totalRowWidth = row.reduce((s, b) => s + b.width + gapX, -gapX)
    let x = Math.floor((maxWidth - totalRowWidth) / 2)
    const y = ri * (badgeHeight + gapY) + gapY

    row.forEach(b => {
      const delay = (badgeIdx * 0.04).toFixed(2)
      const icon = loadIconSvgContent(b)
      let iconSvg = ""
      if (icon) {
        if (icon.isStroke) {
          iconSvg = `<svg x="${x + padX}" y="${y + (badgeHeight - iconSize) / 2}" width="${iconSize}" height="${iconSize}" viewBox="${icon.viewBox}" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon.inner}</svg>`
        } else {
          iconSvg = `<svg x="${x + padX}" y="${y + (badgeHeight - iconSize) / 2}" width="${iconSize}" height="${iconSize}" viewBox="${icon.viewBox}" fill="white">${icon.inner.replace(/fill=['"](?!none|white)[^'"]*['"]/g, "fill='white'")}</svg>`
        }
      }
      elements.push(`  <g class="b" style="animation-delay:${delay}s">
    <rect x="${x}" y="${y}" width="${b.width}" height="${badgeHeight}" rx="2" fill="#111"/>
    ${iconSvg}
    <text x="${x + padX + iconSize + 8}" y="${y + badgeHeight / 2 + 1}" fill="white" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}" dominant-baseline="middle">${b.label}</text>
  </g>`)
      x += b.width + gapX
      badgeIdx++
    })
  })

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${maxWidth} ${svgHeight}" width="100%">
<style>
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .b { opacity: 0; animation: fadeIn 0.3s ease forwards; }
</style>
${elements.join("\n")}
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
  generateBadgesSvg("badges.svg")
  generateFile("README.md", false)
  generateFile("index.html", true)
  console.log("Generated README.md, index.html, and badges.svg")
}

module.exports = { generateFile }
