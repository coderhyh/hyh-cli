#!/usr/bin/env ts-node

import { program } from 'commander'

import { createCommand } from './core/createCommand'
import { helpOptions } from './core/helpOptions'

helpOptions()

createCommand()

program.parse(process.argv)
