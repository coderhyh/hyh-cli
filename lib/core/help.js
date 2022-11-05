"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpOptions = void 0;
const commander_1 = require("commander");
const helpOptions = () => {
    const version = require("../../package.json").version;
    commander_1.program.version(version, "-v, --version", "查看版本");
    commander_1.program.option("-d, --dest <dest>", "自定义目录, 例如: hyh addcpn component -d [src/component]", "src/component");
};
exports.helpOptions = helpOptions;
