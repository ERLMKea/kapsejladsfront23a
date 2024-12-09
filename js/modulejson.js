
function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

async function restDelete(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions)
    return response
}

function getIpAddress() {
    return "http://localhost:8080";
}


export { fetchAnyUrl, restDelete, getIpAddress}

