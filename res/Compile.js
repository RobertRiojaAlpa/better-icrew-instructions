//v10
class Compile {
    static viewInNewTab(textBlocks, tabTitle) {
        let html = "<style>body {margin: 0px;}</style>" + TextBlock.getHtmlFromTextBlocks(textBlocks);

        const blob = new Blob([html], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);
        const newTab = window.open();

        if(newTab) {
            newTab.document.write(`
<html>
    <head>
    <title>${tabTitle}</title>
        <style>
            body { padding: 0; overflow: hidden; display: grid; grid-template-rows: min-content 1fr; justify-items: start; grid-gap: 0.5rem; margin-right: 0; }
            iframe { width: 100%; height: 100%; border: none; }
        </style>
    </head>
    <body>
        <button onclick="document.getElementById('iframe').contentWindow.print();">Print</button>
        <iframe id="iframe" src="${blobUrl}"></iframe>
    </body>
</html>
`);
            newTab.document.close();
        } else {
            alert("New tab failed to open. Your browser may be blocking popups on this page.\n\nPlease allow popups and try again.");
        }
    }

    static printString(textBlocks, fontSize = "100%") {
        let textToPrint = TextBlock.getHtmlFromTextBlocks(textBlocks);

        // Create a temporary hidden iframe
        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";

        document.body.appendChild(iframe);

        // Write the raw text into the iframe document
        const doc = iframe.contentWindow.document;
        doc.open();
        // Wrap text in <pre> to preserve newlines and formatting
        doc.write(`<pre style="font-family: monospace; white-space: pre-wrap; font-size: ${fontSize};">${textToPrint}</pre>`);
        doc.close();

        // Wait for content to load, trigger print dialog, then remove iframe
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        // Clean up the DOM after a short delay
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    }

    static copyToClipboard(textBlocks) {
        let html = TextBlock.getHtmlFromTextBlocks(textBlocks);
        let plain = TextBlock.getTextFromTextBlocks(textBlocks);

        navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([html], { type: "text/html" }),
                "text/plain": new Blob([plain], { type: "text/plain" })
            })
        ]);
    };

    static savePdf(textBlocks, filename, fontSize = "11") {
        const doc = new jspdf.jsPDF();
        doc.addFileToVFS("CourierNew-Normal.ttf", GM_getResourceText("CourierNewBase64"));
        doc.addFont("CourierNew-Normal.ttf", "CourierNew", "normal");
        doc.setFont("CourierNew");
        doc.setFontSize(fontSize);

        const lineHeight = 5;
        const pageHeight = doc.internal.pageSize.height;
        let y = 1;

        for(let i = 0; i < textBlocks.length; i++) {
            if(i > 0 && textBlocks[i].startOnNewPage) {
                doc.addPage();
                y = 1;
            }

            let lines = textBlocks[i].text.split("\n");

            if(y > 1 && (y * lineHeight) + (lines.length * lineHeight) > pageHeight) {
                doc.addPage();
                y = 1;
            }

            for(let j = 0; j < lines.length; j++) {
                y++;

                if(y * lineHeight > pageHeight) {
                    doc.addPage();
                    y = 1;
                }

                doc.text(lines[j], 10, y * lineHeight);
            }
        }

        doc.save(filename);
    }

    static testSavePdf() {
        this.savePdf([new TextBlock("This is a test", false)], "test_download.pdf", "12")
    }

    static getSchsDataTextBlocks(includeHeader = false, startOnNewPage = false) {
        let rawText = document.getElementById("jacadaform").textContent.replaceAll("\xa0", " ").toUpperCase();
        let outputText = "";

        if(includeHeader) {
            //Title
            outputText += " ".repeat(24);
            outputText += "PILOT SCHEDULE";
            outputText += "\n\n";

            //Name
            rawText = TextUtils.skipUntil(rawText, "NAME:");
            outputText += TextUtils.outputUntil(rawText, "\n");
            outputText += " ";
            rawText = TextUtils.skipUntil(rawText, " ");
            rawText = rawText.trimStart();
            outputText += TextUtils.outputUntil(rawText, "\n");
            rawText = TextUtils.skipIncluding(rawText, "\n\n\n");

            //Employee number
            outputText += " ".repeat(41);
            outputText += "EMP NBR: ";
            outputText += TextUtils.outputIncluding(rawText, "\n");
            rawText = TextUtils.skipIncluding(rawText, "LOT:\n\n\n");
            outputText += "LOT: ";
            outputText += TextUtils.outputIncluding(rawText, "\n");

            //Schedule data
            rawText = TextUtils.skipUntil(rawText, "DTE");
            outputText += TextUtils.outputUntil(rawText, "COMMAND:").replaceAll("\n\n \n\n", "\n").trimEnd();
        } else {
            //Schedule data
            rawText = TextUtils.skipIncluding(rawText, "DTE\n\n \n\n");

            if(rawText.indexOf("RULE VIOLATIONS:") !== -1) {
                outputText += TextUtils.outputUntil(rawText, "RULE VIOLATIONS:").replaceAll("\n\n \n\n", "\n").trimEnd();
                rawText = TextUtils.skipUntil(rawText, "RULE VIOLATIONS:");
                outputText += "\n\n \n\n";
                outputText += TextUtils.outputUntil(rawText, "COMMAND:").trimEnd();
            } else {
                outputText += TextUtils.outputUntil(rawText, "COMMAND:").replaceAll("\n\n \n\n", "\n").trimEnd();
            }
        }

        let outputTextBlocks = outputText.trimEnd().split("\n").filter(t => t.replaceAll("\n", "").length > 0).map(t => new TextBlock(t, false));

        if(startOnNewPage) {
            outputTextBlocks[0].startOnNewPage = startOnNewPage;
        }

        return outputTextBlocks;
    }

    static cleanAllSchsDataTextBlocks(textBlocks) {
        let remarksIndex = textBlocks.findIndex(tb => tb.text.indexOf("REMARKS:") !== -1);
        let remarksLastIndex = textBlocks.findLastIndex(tb => tb.text.indexOf("REMARKS:") !== -1);

        if(remarksIndex !== remarksLastIndex) {
            return [...textBlocks.slice(0, remarksIndex), ...textBlocks.slice(remarksLastIndex)];
        } else {
            return textBlocks;
        }
    }

    static getSchsHistoryTextBlocks(includeHeader = false, startOnNewPage = false) {
        let lineElements = $("#frmHiddenControls").next().find("span");
        let leftMargin = parseInt(lineElements[1].style.left, 10);
        let charWidth = lineElements[1].offsetWidth / lineElements[1].innerText.length;

        let startIndex = includeHeader ? 0 : 4;
        let lastTop = -1;
        let textBlockText = "";
        let outputTextBlocks = [];

        for(let i = startIndex; i < lineElements.length; i++) {
            if(lineElements[i].innerText.includes("*** MORE DATA NEXT SCREEN ***") || lineElements[i].innerText.includes("Enter-PF1---")) {
                break;
            }
			
			if(lineElements.eq(i).text().trim() === "VVVV") {
				continue;
			}

            if(lastTop >= 0 && parseInt(lineElements[i].style.top, 10) - lastTop > 30) {
                textBlockText += "\n";
                outputTextBlocks.push(new TextBlock(textBlockText, false));
                textBlockText = "";
            }

            let numSpacesToAdd = (parseInt(lineElements[i].style.left, 10) - leftMargin) / charWidth;

            textBlockText += " ".repeat(numSpacesToAdd);
            textBlockText += lineElements[i].innerText.replaceAll("\xa0", " ") + "\n";

            if(lineElements[i].innerText.indexOf("MOVEUPS:") !== -1) {
                textBlockText += "\n";
                outputTextBlocks.push(new TextBlock(textBlockText, false));
                textBlockText = "";
            }

            lastTop = parseInt(lineElements[i].style.top, 10);
        }

        if(textBlockText !== "") {
            outputTextBlocks.push(new TextBlock(textBlockText + "\n", false));
        }

        if(startOnNewPage) {
            outputTextBlocks[0].startOnNewPage = startOnNewPage;
        }

        return outputTextBlocks;
    }
	
	static getSchsHistoryAlternateTextBlocks(includeHeader = false, startOnNewPage = false) {
		if($("#frmHiddenControls").next().find("span").length > 0) {
			//There is no header in SCHS history alternate, so always pass true
			return Compile.getSchsHistoryTextBlocks(true, startOnNewPage);
		}
		
		if($(".tbl1").length === 0) {
			console.error("Better: Uknown SCHS history alternate format");
			return [];
		}
		
		return $(".tbl1 tr").map((i, e) => $(e).text().trim()).toArray().join("\n").trimEnd().split("\n\n").map(e => new TextBlock(e + "\n\n", false));
	}

    static getMotsDataTextBlocks(includeHeader = false, startOnNewPage = false, employeeNumber = "", name = "") {
        if(!includeHeader) {
            return [new TextBlock(document.getElementsByClassName("tbl1")[0].innerText.replaceAll("\xa0", " ").toUpperCase(), startOnNewPage)];
        }

        let rawText = document.getElementById("jacadaform").textContent.replaceAll("\xa0", " ").toUpperCase();
        let outputText = "";

        //Title
        outputText += " ".repeat(31);
        outputText += "MONTHLY TIME DATA";
        outputText += "\n\n";

        //Bid period
        rawText = TextUtils.skipUntil(rawText, "BID PERIOD:");
        outputText += TextUtils.outputUntil(rawText, "\n");

        //Start date
        outputText += " ".repeat(3);
        rawText = TextUtils.skipIncluding(rawText, "\n ");
        outputText += TextUtils.outputUntil(rawText, "\n");

        //End date
        outputText += " - ";
        rawText = TextUtils.skipIncluding(rawText, "\n ");
        outputText += TextUtils.outputUntil(rawText, "\n");

        //Base, equipment, position
        outputText += " ".repeat(20);
        rawText = TextUtils.skipIncluding(rawText, "\n ");
        outputText += TextUtils.outputUntil(rawText, "\n");

        //Init lot
        outputText += " ".repeat(5);
        rawText = TextUtils.skipUntil(rawText, "INIT LOT:");
        outputText += TextUtils.outputUntil(rawText, "\n");
        outputText += " ";
        rawText = TextUtils.skipIncluding(rawText, "\n ");
        outputText += TextUtils.outputUntil(rawText, "\n");

        //Name
        outputText += "\n";
        outputText += "NAME: "
        let spacesafterName = 45;
        if(name !== "") {
            spacesafterName -= name.length;
            outputText += name.toUpperCase();
            outputText += " ".repeat(spacesafterName);
        } else {
            outputText += " ".repeat(spacesafterName);
        }

        //Employee number
        outputText += "EMP NBR: ";
        outputText += employeeNumber;

        //Timecard
        outputText += "\n";
        outputText += document.getElementsByClassName("tbl1")[0].innerText.replaceAll("\xa0", " ").toUpperCase();

        return [new TextBlock(outputText, startOnNewPage)];
    }

    static getMotvDataTextBlocks(makeNewPage = false) {
        return [new TextBlock(document.getElementsByClassName("tbl1")[0].innerText.replaceAll("\xa0", " ").trimEnd() + "\n\n\n", makeNewPage)];
    }

    static getSickTextBlocks(includeHeader = false, startOnNewPage = false) {
        let parentElement = document.getElementById("frmHiddenControls").nextElementSibling;
        let lineElements = [...parentElement.querySelectorAll("span")];
        let isOnLastPage = false;

        if(lineElements[0].innerText === "AT TOP OF DATA" || lineElements[0].innerText === "AT BOTTOM OF DATA") {
            if(lineElements[0].innerText === "AT BOTTOM OF DATA") {
                isOnLastPage = true;
            }

            lineElements = lineElements.slice(1);
        }

        let topMargin = parseInt(lineElements[0].style.top, 10);
        let leftMargin = Math.min(...lineElements.map(e => parseInt(e.style.left, 10)));
        let charWidth = lineElements[0].offsetWidth / lineElements[0].innerText.length;
        let lineHeight = parseInt(lineElements[2].style.top, 10) - parseInt(lineElements[0].style.top, 10);

        let isInHeader = true;
        let isInFooter = false;
        let firstLineNumber = -1;
        let output = [];

        for(let i = 0; i < lineElements.length; i++) {
            let lineText = lineElements[i].innerText;

            //Prevent command portion of footer
            if(lineText.indexOf("TYPE 'H' UNDER 'CMD' FOR HISTORY") !== -1) {
                break;
            }

            //We're in the footer
            if(lineText.indexOf("SICK USAGE HOURS FOR") !== -1) {
                isInFooter = true;
            }

            //We're in the header
            if(lineText === "----- ---") {
                isInHeader = false;
                continue;
            }

            //If we're on the last page, skip everything until we're in the footer
            if(isOnLastPage && !isInFooter) {
                continue;
            }

            //If we're not on the last page, break when we get to the footer
            if(!isOnLastPage && isInFooter) {
                break;
            }

            //If we don't want the header, continue if we're in the header
            if(!includeHeader && isInHeader) {
                continue;
            }

            let lineNumber = (parseInt(lineElements[i].style.top, 10) - topMargin) / lineHeight;
            firstLineNumber = firstLineNumber === -1 ? lineNumber : firstLineNumber;
            let charStartPosition = (parseInt(lineElements[i].style.left, 10) - leftMargin) / charWidth;

            while(output.length < lineNumber + 1) {
                output.push(" ".repeat(200));
            }

            output[lineNumber] = output[lineNumber].slice(0, charStartPosition) + lineText + output[lineNumber].slice(charStartPosition + lineText.length);
        }

        output = output.slice(firstLineNumber).map(l => l.trimEnd());

        if(includeHeader) {
            let headerEndIndex = output.findIndex(o => o.indexOf("-------") !== -1) + 1;
            return [new TextBlock(output.slice(0, headerEndIndex).join("\n"), startOnNewPage), new TextBlock(output.slice(headerEndIndex).join("\n"), false)];
        } else if(isOnLastPage) {
            return [new TextBlock(" ", false), new TextBlock(output.join("\n"), false)];
        } else {
            return [new TextBlock(output.join("\n"), false)];
        }
    }

    static getNewRotationText() {
        let parentElement = document.getElementById("frmHiddenControls").nextElementSibling;
        let lineElements = parentElement.querySelectorAll("span");
        let leftMargin = parseInt(lineElements[0].style.left, 10);
        let charWidth = lineElements[0].offsetWidth / lineElements[0].innerText.length;

        let output = "";

        for(let i = 0; i < lineElements.length; i++) {
            if(lineElements[i].innerText === "ENTER---") {
                break;
            }

            let numSpacesToAdd = (parseInt(lineElements[i].style.left, 10) - leftMargin) / charWidth;

            output += " ".repeat(numSpacesToAdd);
            output += lineElements[i].innerText.replaceAll("\xa0", " ") + "\n";
        }

        return output.trimEnd();
    }

    static addNewRotationTextToExistingTextBlocks(existingTextBlocks, newText) {
        if(existingTextBlocks == false) {
            return [new TextBlock(newText, false)];
        }

        let existingLines = existingTextBlocks[0].text.trimEnd().split("\n");
        let newLines = newText.trimEnd().split("\n");

        let matchingLineInExistingIndex = -1;
        let matchingLineInNewIndex = -1;

        let finalMatchingLineInNewIndex = -1;

        for(let i = 0; i < newLines.length; i++) {
            if(matchingLineInExistingIndex >= 0 && matchingLineInNewIndex >= 0) {
                for(let j = 1; j < existingLines.length - matchingLineInExistingIndex; j++) {
                    if(existingLines[matchingLineInExistingIndex + j].trim() !== newLines[matchingLineInNewIndex + j].trim()) {
                        matchingLineInExistingIndex = -1;
                        matchingLineInNewIndex = -1;

                        finalMatchingLineInNewIndex = -1;
                        break;
                    }

                    finalMatchingLineInNewIndex = matchingLineInNewIndex + j;
                }

                if(finalMatchingLineInNewIndex > -1) {
                    break;
                }
            }

            for(let j = 0; j < existingLines.length; j++) {
                if(newLines[i].trim() === existingLines[j].trim()) {
                    matchingLineInNewIndex = i;
                    matchingLineInExistingIndex = j;
                    break;
                }
            }
        }

        return [new TextBlock(existingTextBlocks[0].text + "\n" + newLines.slice(finalMatchingLineInNewIndex + 1).join("\n"))];
    }

    static getRotsHistoryTextBlocks(includeHeader = false) {
        let text = document.getElementsByClassName("tbl1")[0].innerText.replaceAll("\xa0", " ");

        if(!includeHeader) {
            text = TextUtils.skipIncluding(text, "----------------------");
            text = TextUtils.skipIncluding(text, "\n");
            text = TextUtils.skipIncluding(text, "\n");
        }

        return [new TextBlock(text, false)];
    }

    static getRphTextBlocks() {
        return [new TextBlock(document.getElementById("DataBox").innerText.replaceAll("\xa0", " "), false)];
    }

    static getMpiTextBlocks() {
        return [new TextBlock(document.getElementById("DataBox").innerText.replaceAll("\xa0", " "), false)];
    }

    static get23m7TextBlocks(includeHeader = false) {
        let text = document.getElementsByClassName("tbl1")[0].innerText.replaceAll("\xa0", " ").trimEnd();

        if(includeHeader) {
            return text.split("\n").map(t => new TextBlock(t, false));
        }

        text = TextUtils.skipIncluding(text, "--------  -----  ----  ---- --- ---  ----  -----   --------  -----------  ----\n");
        text = TextUtils.skipIncluding(text, "\n");

        return text.split("\n").map(t => new TextBlock(t, false));
    }
}