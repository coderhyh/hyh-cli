"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const commander_1 = require("commander");
const action_1 = require("./action");
const createCommand = () => {
    commander_1.program
        .command("create <projectName>")
        .description("创建一个项目 vue | react")
        .action(action_1.createProjectAction);
    commander_1.program
        .command("config")
        .description("获取配置文件地址; 可自行更改")
        .action(action_1.getConfigAction);
};
exports.createCommand = createCommand;
