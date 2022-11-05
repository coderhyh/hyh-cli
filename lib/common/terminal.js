"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandExec = void 0;
// const { spawn } = require('child_process');
const child_process_1 = require("child_process");
// npm install
const commandExec = (...args) => {
    return new Promise((resolve, reject) => {
        const childProcess = (0, child_process_1.exec)(...args);
        childProcess.stdout?.pipe(process.stdout);
        childProcess.stderr?.pipe(process.stderr);
        childProcess.on("close", () => {
            resolve();
        });
    });
};
exports.commandExec = commandExec;
