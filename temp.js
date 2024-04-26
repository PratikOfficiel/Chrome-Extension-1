async function printTabs() {
    const data = [];
    const tabs = await chrome.tabs.query({currentWindow: true});
    const tabData = tabs.map(tab => (
        {
            title: tab.title,
            url: tab.url
        }
    ));

    const uniqueTabs = [];

    tabData.forEach(element => {
        if(!uniqueTabs.some(t => t.url === element.url)) {
            uniqueTabs.push(element);
        }
    });

    uniqueTabs.push({duplicates: tabData.length-uniqueTabs.length})
    // console.log(urls);
    const rootDiv = document.getElementById('links');
    
    let content = JSON.stringify(uniqueTabs, null, 4);

    // for(const url of urls) {
    //     content = content + url + "\n";
    //     // content = content + `<a href="${url}" target="_blank">${url}</a></br>`;
    // }

    rootDiv.textContent = content;
}

function openTabs() {
    const rawLinks = document.getElementById('open-links').value;
    let urlPattern = /(https?:\/\/[^\s"]+)/g;
    const urls = rawLinks.match(urlPattern);

    console.log(urls);

    for(const url of urls) {
        chrome.tabs.create({url: url});
    }
}

function copyLinks() {
    const linkDiv = document.getElementById('links');

    navigator.clipboard.writeText(linkDiv.innerText);

    alert("Copied the text: " + linkDiv.innerText);
}

document.addEventListener('DOMContentLoaded', printTabs);

document.getElementById('open-btn').addEventListener('click', openTabs);

document.getElementById('copy-btn').addEventListener('click', copyLinks);