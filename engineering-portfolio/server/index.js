import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 4000

app.use(bodyParser.json({ limit: '1mb' }))

function writeModule(filePath, exportName, data) {
  const json = JSON.stringify(data, null, 2)
  const content = `export const ${exportName} = ${json};\n`
  fs.writeFileSync(filePath, content, 'utf8')
}

app.post('/api/save', (req, res) => {
  try {
    const { projects, roles, skillGroups } = req.body || {}
    const baseDir = path.join(__dirname, '..', 'src', 'data')

    if (projects) {
      writeModule(path.join(baseDir, 'projects.js'), 'projects', projects)
    }
    if (roles) {
      writeModule(path.join(baseDir, 'experience.js'), 'roles', roles)
    }
    if (skillGroups) {
      writeModule(path.join(baseDir, 'skills.js'), 'skillGroups', skillGroups)
    }

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Local content API running on http://localhost:${PORT}`)
})
