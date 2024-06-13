export function getXPathResult(doc, path) {
    const xpathResult = doc.evaluate(
        path,
        doc,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    const result = [];
    for (let i = 0; i < xpathResult.snapshotLength; i++) {
        result.push(xpathResult.snapshotItem(i).textContent);
    }
    return result;
}

export function getFieldData(doc, name, fields) {
    const fieldData = fields.flatMap((field) => {
        const xPath = `//Item[@alias='${name}']/${field}`;
        return getXPathResult(doc, xPath);
    });
    return fieldData;
}
