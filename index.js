#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const help_1 = require("./lib/core/help");
const create_1 = require("./lib/core/create");
(0, help_1.helpOptions)();
(0, create_1.createCommand)();
commander_1.program.parse(process.argv);
