"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectAction = void 0;
const { origin } = require("../../config/repo-config.json");
const utils_1 = require("../../common/utils");
const terminal_1 = require("../../common/terminal");
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const download = (0, utils_1.promisify)(require("download-git-repo"));
const { prompt } = inquirer_1.default;
const createProjectAction = async (projectName) => {
    const res = await prompt({
        type: "rawlist",
        name: "frame",
        message: "选择一个框架",
        default: "vue",
        choices: ["vue", "react"],
    });
    if (res.frame === "react") {
        console.log("react暂无");
        return;
    }
    if (fs_1.default.existsSync(projectName)) {
        const res = await prompt({
            type: "confirm",
            name: "isCover",
            message: `${projectName} 目录已存在, 是否覆盖？`,
        });
        const rmDir = process.platform === 'win32' ? 'rd /s /q' : 'rm -rf';
        if (res.isCover)
            await (0, terminal_1.commandExec)(`${rmDir} ${projectName}`, {});
        else
            return;
    }
    await (0, utils_1.fnLoadingByOra)(() => download(origin[res.frame], projectName, { clone: true }), "正在拉取项目...");
    const packagePath = `${projectName}/package.json`;
    if (fs_1.default.existsSync(packagePath)) {
        let _package = fs_1.default.readFileSync(packagePath).toString();
        _package = JSON.parse(_package);
        _package.name = projectName;
        _package.version = "1.0.0";
        fs_1.default.unlinkSync(packagePath);
        fs_1.default.writeFileSync(packagePath, JSON.stringify(_package, undefined, 2));
    }
};
exports.createProjectAction = createProjectAction;
