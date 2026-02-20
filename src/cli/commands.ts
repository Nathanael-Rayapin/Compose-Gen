#!/usr/bin/env node

import { program } from 'commander'
import { initCommand } from '../index.js'

program
  .name('compose-gen')
  .description('Generate Docker Compose files with best practices')
  .version('0.0.1')

program
  .command('init')
  .description('Create an empty compose.yaml file in the current directory')
  .action(initCommand)

program.parse()