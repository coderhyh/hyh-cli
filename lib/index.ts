#!/usr/bin/env node

import { program } from "commander";

import { helpOptions } from "./core/help";
import { createCommand } from "./core/create";

helpOptions();

createCommand()

program.parse(process.argv);
