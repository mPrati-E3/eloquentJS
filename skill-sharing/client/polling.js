async function pollTalks(update) {
    let tag = undefined;
    for (;;) {
        let response;
        try {
            response = await fetchOK("/talks", {
                headers: tag && {"If-None-Match": tag,"Prefer": "wait=90"}
            });
        } catch (e) {
            console.log("Request failed: " + e);
            await new Promise(resolve => setTimeout(resolve, 500));
            continue;
        }
        if (response.status == 304) continue;
        tag = response.headers.get("ETag");
        update(await response.json());
    }
}