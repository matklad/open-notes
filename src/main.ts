import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "helloworld-sample" is now active!');

    context.subscriptions.push(vscode.commands.registerCommand('open-notes.open', async () => {
        const config = vscode.workspace.getConfiguration("open-notes")
        const notesFile: string | undefined | null = config.get("notes-file")
        if (!notesFile) {
            await vscode.window.showErrorMessage("`open-notes.file-path` config value not set")
            return
        }
        const uri = vscode.Uri.file(notesFile)
        const doc = await vscode.workspace.openTextDocument(uri)
        const editor = vscode.window.activeTextEditor
        if (editor?.document == doc) {
            await vscode.commands.executeCommand("workbench.action.closeActiveEditor")
            return
        }
        vscode.window.showTextDocument(doc)
    }));
}
