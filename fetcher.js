//Fetching the xml file from the url and parsing it
export async function fetchXML(url) {
    const response = await fetch(url);
    const text = await response.text();
    return new DOMParser().parseFromString(text, 'application/xml');
}
