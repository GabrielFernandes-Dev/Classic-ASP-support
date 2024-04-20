import * as vscode from 'vscode';

export function updateDiagnostics(document: vscode.TextDocument, diagnostics: vscode.DiagnosticCollection): void {
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

        const diagnostic = new vscode.Diagnostic(
            new vscode.Range(startPos, endPos),
            "If without End If",
            vscode.DiagnosticSeverity.Error // ou Warning ou Information
        );
        problems.push(diagnostic);
    }

    // Envie os problemas encontrados para o VS Code
    diagnostics.set(document.uri, problems);
}