//v1
class TextBlock {
    constructor(text, startOnNewPage = false) {
        this.text = text;
        this.startOnNewPage = startOnNewPage;
    }

    static getTextFromTextBlocks(textBlocks) {
        return textBlocks.map(tb => tb.text).join("\n");
    }

    static getHtmlFromTextBlocks(textBlocks) {
        return textBlocks.map((tb, i) => i > 0 && tb.startOnNewPage ? `<div style="break-after: page;"></div><div style="break-inside: avoid; white-space: pre; font-family: monospace;">${tb.text}</div>` : `<div style="break-inside: avoid; white-space: pre; font-family: monospace;">${tb.text}</div>`).join("");
    }
}