import * as vscode from 'vscode';
import * as fs from 'node:fs';

export function activate(context: vscode.ExtensionContext) {

    // Add command to open extension config
    let openConfig = vscode.commands.registerCommand('AutomaticWakatimeProjects.openConfig', async () => {
        const configUri = vscode.Uri.joinPath(context.globalStorageUri, 'AutomaticWakatimeProjects.config.json');
        if (!fs.existsSync(context.globalStorageUri.fsPath)) {
            await vscode.workspace.fs.createDirectory(context.globalStorageUri);
        }
        if (!fs.existsSync(configUri.fsPath)) {
            fs.writeFileSync(configUri.fsPath, JSON.stringify({ global: { keywords: [] }, scopes: [] }, null, 4));
        }
        const doc = await vscode.workspace.openTextDocument(configUri);
        await vscode.window.showTextDocument(doc);
    });
}