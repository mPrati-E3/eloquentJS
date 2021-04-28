/*[{"title": "Unituning",
"presenter": "Jamal",
"summary": "Modifying your cycle for extra style",
"comments": []}]}*/

console.log("/talks/" + encodeURIComponent("How to Idle"));
// → /talks/How%20to%20Idle

/*PUT /talks/How%20to%20Idle HTTP/1.1
Content-Type: application/json
Content-Length: 92
{"presenter": "Maureen",
"summary": "Standing still on a unicycle"}*/

/*POST /talks/Unituning/comments HTTP/1.1
Content-Type: application/json
Content-Length: 72
{"author": "Iman",
"message": "Will you talk about raising a cycle?"}*/

/*GET /talks HTTP/1.1
If-None-Match: "4"
Prefer: wait=90
(il tempo passa)HTTP/1.1 200 OK
Content-Type: application/json
ETag: "5"
Content-Length: 295
[....]*/

