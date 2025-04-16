"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const path_1 = require("path");
let activeDecorations = [];
function activate(context) {
    const applyHighlights = () => {
        const editor = vscode_1.window.activeTextEditor;
        if (!editor)
            return;
        clearHighlights();
        const config = vscode_1.workspace.getConfiguration('dynamicHighlighter').get('rules');
        if (config) {
            config.forEach(rule => {
                try {
                    // Verificar la extensión del archivo si se especifica en la regla
                    if (rule.extension && rule.extension.length > 0) {
                        const fileExtension = (0, path_1.extname)(editor.document.uri.fsPath).substring(1).toLowerCase(); // Obtener la extensión sin el punto
                        if (!rule.extension.map(lang => lang.toLowerCase()).includes(fileExtension)) {
                            return; // Saltar esta regla si la extensión no coincide
                        }
                    }
                    const decorationType = vscode_1.window.createTextEditorDecorationType({
                        color: rule.foreground,
                        backgroundColor: rule.background,
                        overviewRulerColor: rule.background,
                        overviewRulerLane: vscode_1.OverviewRulerLane.Right,
                    });
                    const regex = new RegExp(rule.pattern, 'g');
                    const text = editor.document.getText();
                    const ranges = [];
                    for (const match of text.matchAll(regex)) {
                        const start = editor.document.positionAt(match.index || 0);
                        const end = editor.document.positionAt((match.index || 0) + match[0].length);
                        ranges.push({ range: new vscode_1.Range(start, end) });
                    }
                    editor.setDecorations(decorationType, ranges);
                    activeDecorations.push(decorationType);
                }
                catch (error) {
                    console.error(`Error al crear la decoración para el patrón "${rule.pattern}": ${error}`);
                    vscode_1.window.showErrorMessage(`Error en la configuración de resaltado para "${rule.pattern}". Revise la sintaxis de la expresión regular o la configuración de lenguajes.`);
                }
            });
        }
    };
    const clearHighlights = () => {
        const editor = vscode_1.window.activeTextEditor;
        if (!editor)
            return;
        activeDecorations.forEach(deco => deco.dispose());
        activeDecorations = [];
    };
    context.subscriptions.push(vscode_1.window.onDidChangeActiveTextEditor(() => {
        applyHighlights();
    }), vscode_1.workspace.onDidChangeTextDocument(() => {
        applyHighlights();
    }), vscode_1.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('dynamicHighlighter.rules')) {
            applyHighlights();
        }
    }), vscode_1.commands.registerCommand('dynamic-highlighter.reloadConfig', () => {
        applyHighlights();
        vscode_1.window.showInformationMessage('Configuración de resaltado recargada desde settings');
    }));
    applyHighlights();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map