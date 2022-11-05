#!/usr/bin/env ts-node

import { program } from "commander";

import { helpOptions } from "./lib/core/help";
import { createCommand } from "./lib/core/create";

helpOptions();

createCommand()

program.parse(process.argv);
