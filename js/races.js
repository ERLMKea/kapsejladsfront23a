import {fetchAnyUrl, restDelete, getIpAddress} from "./modulejson.js";


async function fetchRaces() {
    const url = getIpAddress() +  "/races";
    const data = await fetchAnyUrl(url)
    tableBody.innerHTML = ""
    data.forEach(putDataInTableWButton)
}

function putDataInTableWButton(data, index) {

    //vi skaber en række for hver data
    const tr = document.createElement("tr")

    tr.innerHTML =
        "<td>" + data.raceID + "</td>" +
        "<td>" + data.boatType + "</td>" +
        "<td>" + data.raceStart + "</td>" +
        "<td>" +
        "<button class='editBtn' id='editBtn" + index + "' value='" + data + "'>Rediger</button>" +
        "</td>"

    tr.row = index

    tableBody.appendChild(tr)

    const editBtn = document.getElementById("editBtn" + index);


    editBtn.addEventListener("click", () => {
        editRace(data)
    })

}

function editRace(data) {
    console.log("editboat")
    debugger
    window.localStorage.setItem("raceID", data.raceID)
    window.location.href = "xeditrace.html";
}


fetchRaces()

