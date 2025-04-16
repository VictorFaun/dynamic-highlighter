"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
let activeDecorations = [];
function activate(context) {
    const applyHighlights = () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        clearHighlights();
        const config = vscode.workspace.getConfiguration('dynamicHighlighter').get('rules');
        if (config) {
            config.forEach(rule => {
                try {
                    // Verificar la extensión del archivo si se especifica en la regla
                    if (rule.extension && rule.extension.length > 0) {
                        const fileExtension = path.extname(editor.document.uri.fsPath).substring(1).toLowerCase(); // Obtener la extensión sin el punto
                        if (!rule.extension.map(lang => lang.toLowerCase()).includes(fileExtension)) {
                            return; // Saltar esta regla si la extensión no coincide
                        }
                    }
                    const decorationType = vscode.window.createTextEditorDecorationType({
                        color: rule.foreground,
                        backgroundColor: rule.background,
                        overviewRulerColor: rule.background,
                        overviewRulerLane: vscode.OverviewRulerLane.Right,
                    });
                    const regex = new RegExp(rule.pattern, 'g');
                    const text = editor.document.getText();
                    const ranges = [];
                    for (const match of text.matchAll(regex)) {
                        const start = editor.document.positionAt(match.index || 0);
                        const end = editor.document.positionAt((match.index || 0) + match[0].length);
                        ranges.push({ range: new vscode.Range(start, end) });
                    }
                    editor.setDecorations(decorationType, ranges);
                    activeDecorations.push(decorationType);
                }
                catch (error) {
                    console.error(`Error al crear la decoración para el patrón "${rule.pattern}": ${error}`);
                    vscode.window.showErrorMessage(`Error en la configuración de resaltado para "${rule.pattern}". Revise la sintaxis de la expresión regular o la configuración de lenguajes.`);
                }
            });
        }
    };
    const clearHighlights = () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        activeDecorations.forEach(deco => deco.dispose());
        activeDecorations = [];
    };
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => {
        applyHighlights();
    }), vscode.workspace.onDidChangeTextDocument(() => {
        applyHighlights();
    }), vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('dynamicHighlighter.rules')) {
            applyHighlights();
        }
    }), vscode.commands.registerCommand('dynamic-highlighter.reloadConfig', () => {
        applyHighlights();
        vscode.window.showInformationMessage('Configuración de resaltado recargada desde settings');
    }));
    applyHighlights();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map