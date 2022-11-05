"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigAction = void 0;
const path_1 = __importDefault(require("path"));
const getConfigAction = () => {
    const _path = path_1.default.resolve(__dirname, '../../config/repo-config.json');
    console.log(_path);
};
exports.getConfigAction = getConfigAction;
