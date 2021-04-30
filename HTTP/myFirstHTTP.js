function backgroundReadFile(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
      if (req.status < 400)
        callback(req.responseText);
    });
    req.send(null);
}
  
function getURL(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
      if (req.status < 400)
        callback(req.responseText);
      else
        callback(null, new Error("Request failed: " + req.statusText));
    });
    req.addEventListener("error", function() {
      callback(null, new Error("Network error"));
    });
    req.send(null);
}

const url = "https://eloquentjavascript.net/author";
const types = ["text/plain",
               "text/html",
               "application/json",
               "application/rainbows+unicorns"];

/*async function showTypes() {
  for (let type of types) {
    let resp = await fetch(url, {headers: {accept: type}});
    console.log(`${type}: ${await resp.text()}\n`);
  }
}

showTypes();*/