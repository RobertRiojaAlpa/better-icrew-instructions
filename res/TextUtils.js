//v1
class TextUtils {
    static skipUntil(rawText, skipUntilText) {
        return rawText.slice(rawText.indexOf(skipUntilText));
    }

    static skipIncluding(rawText, skipIncludingText) {
        return rawText.slice(rawText.indexOf(skipIncludingText) + skipIncludingText.length);
    }

    static outputUntil(rawText, outputUntilText) {
        return rawText.slice(0, rawText.indexOf(outputUntilText));
    }

    static outputIncluding(rawText, outputIncludingText) {
        return rawText.slice(0, rawText.indexOf(outputIncludingText) + outputIncludingText.length);
    }
}