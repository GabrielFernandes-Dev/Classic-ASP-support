import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { updateDiagnostics } from './diagnostics';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Inicializando a extensão!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('classic-asp-support.newClass', (args) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		promptNewFile(args, "class");
	});

	const diagnostics = vscode.languages.createDiagnosticCollection('asp')
	context.subscriptions.push(diagnostics)
	vscode.workspace.onDidSaveTextDocument((document) => {
		if(document.languageId === "asp"){
			updateDiagnostics(document, diagnostics);
		}
	}, null, context.subscriptions)

	context.subscriptions.push(disposable);
}

export function promptNewFile(args, templatetype: string) {
    if (args == null) {
        args = { _fsPath: vscode.workspace.rootPath }
    }
    let incomingpath: string = args._fsPath;
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

export function correctExtension(filename) {
    if (path.extname(filename) !== '.asp') {
        if (filename.endsWith('.')) {
            filename = filename + 'asp';
        } else {
            filename = filename + '.asp';
        }
    }
    return filename;
}

export function openTemplateAndSaveNewFile(type: string, filename: string, originalfilepath: string) {
    let templatefileName = type + '.tmpl';

    vscode.workspace.openTextDocument(vscode.extensions.getExtension('gabrielfernandes-Smarthis.classic-asp-support')?.extensionPath + '/templates/' + templatefileName)
        .then((doc: vscode.TextDocument) => {
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

export function findCursorInTemlpate(text: string) {
    let cursorPos = text.indexOf('${cursor}');
    let preCursor = text.substr(0, cursorPos);
    let lineNum = preCursor.match(/\n/gi)?.length;
    let charNum = preCursor.substr(preCursor.lastIndexOf('\n')).length;
    return new vscode.Position(lineNum!, charNum);
}


// This method is called when your extension is deactivated
export function deactivate() {}
