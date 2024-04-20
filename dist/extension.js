/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.findCursorInTemlpate = exports.openTemplateAndSaveNewFile = exports.correctExtension = exports.promptNewFile = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
const diagnostics_1 = __webpack_require__(4);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Inicializando a extensão!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('classic-asp-support.newClass', (args) => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        promptNewFile(args, "class");
    });
    const diagnostics = vscode.languages.createDiagnosticCollection('asp');
    context.subscriptions.push(diagnostics);
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === "asp") {
            (0, diagnostics_1.updateDiagnostics)(document, diagnostics);
        }
    }, null, context.subscriptions);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function promptNewFile(args, templatetype) {
    if (args == null) {
        args = { _fsPath: vscode.workspace.rootPath };
    }
    let incomingpath = args._fsPath;
    vscode.window.showInputBox({ ignoreFocusOut: true, prompt: 'Digite o nome do arquivo', value: 'new' + templatetype + '.asp' })
        .then((newfilename) => {
        if (typeof newfilename === 'undefined') {
            return;
        }
        var newfilepath = incomingpath + path.sep + newfilename;
        if (fs.existsSync(newfilepath)) {
            vscode.window.showErrorMessage("File already exists");
            return;
        }
        newfilepath = correctExtension(newfilepath);
        var originalfilepath = newfilepath;
        newfilepath = path.basename(newfilepath, '.asp');
        openTemplateAndSaveNewFile(templatetype, newfilepath, originalfilepath);
    });
}
exports.promptNewFile = promptNewFile;
function correctExtension(filename) {
    if (path.extname(filename) !== '.asp') {
        if (filename.endsWith('.')) {
            filename = filename + 'asp';
        }
        else {
            filename = filename + '.asp';
        }
    }
    return filename;
}
exports.correctExtension = correctExtension;
function openTemplateAndSaveNewFile(type, filename, originalfilepath) {
    let templatefileName = type + '.tmpl';
    vscode.workspace.openTextDocument(vscode.extensions.getExtension('gabrielfernandes-Smarthis.classic-asp-support')?.extensionPath + '/templates/' + templatefileName)
        .then((doc) => {
        let text = doc.getText();
        text = text.replace('${ClassName}', filename);
        let cursorPosition = findCursorInTemlpate(text);
        text = text.replace('${cursor}', '');
        fs.writeFileSync(originalfilepath, text);
        vscode.workspace.openTextDocument(originalfilepath).then((doc) => {
            vscode.window.showTextDocument(doc).then((editor) => {
                let newselection = new vscode.Selection(cursorPosition, cursorPosition);
                editor.selection = newselection;
            });
        });
    });
}
exports.openTemplateAndSaveNewFile = openTemplateAndSaveNewFile;
function findCursorInTemlpate(text) {
    let cursorPos = text.indexOf('${cursor}');
    let preCursor = text.substr(0, cursorPos);
    let lineNum = preCursor.match(/\n/gi)?.length;
    let charNum = preCursor.substr(preCursor.lastIndexOf('\n')).length;
    return new vscode.Position(lineNum, charNum);
}
exports.findCursorInTemlpate = findCursorInTemlpate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateDiagnostics = void 0;
const vscode = __importStar(__webpack_require__(1));
function updateDiagnostics(document, diagnostics) {
    const problems = []; // Aqui você vai armazenar os problemas encontrados
    const text = document.getText();
    // Implemente a lógica para verificar os problemas de sintaxe aqui
    // Você pode usar expressões regulares ou outro método para analisar o texto
    // Exemplo simples: verificar se cada 'If' tem um 'End If' correspondente
    const ifPattern = /If/g;
    let match;
    while (match = ifPattern.exec(text)) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const diagnostic = new vscode.Diagnostic(new vscode.Range(startPos, endPos), "If without End If", vscode.DiagnosticSeverity.Error // ou Warning ou Information
        );
        problems.push(diagnostic);
    }
    // Envie os problemas encontrados para o VS Code
    diagnostics.set(document.uri, problems);
}
exports.updateDiagnostics = updateDiagnostics;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map