#!/usr/bin/env node

import path from 'node:path'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDev = process.env.NODE_ENV === 'development'
    || !fs.existsSync(path.join(__dirname, '../dist'))

if (isDev) {
    const tsxPath = path.join(__dirname, '../node_modules/.bin/tsx')
    const scriptPath = path.join(__dirname, '../src/cli/commands.ts')

    const child = spawn(tsxPath, [scriptPath, ...process.argv.slice(2)], {
        stdio: 'inherit',
        shell: true
    })

    child.on('exit', (code) => {
        process.exit(code ?? 0)
    })
} else {
    await import('../dist/cli/commands.js')
}