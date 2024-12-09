


function putDataInTableWButton(data, index) {

    //vi skaber en række for hver data
    const tr = document.createElement("tr")

    tr.innerHTML =
        "<td>" + data.boatID + "</td>" +
        "<td>" + data.boatType + "</td>" +
        "<td>" + data.name + "</td>" +
        "<td>" +
        "<button class='editBtn' id='editBtn" + index + "' value='" + data + "'>Rediger</button>" +
        "</td>" +
        "<td>" +
        "<button class='racesBtn' id='racesBtn" + index + "' value='" + data + "'>Resultater</button>" +
        "</td>" +
        "<td>" +
        "<button class='deleteBtn' id='deleteBtn" + index + "' value='" + data + "'>Slet</button>" +
        "</td>"

    tr.row = index

    tableBody.appendChild(tr)

    const editBtn = document.getElementById("editBtn" + index);
    const racesBtn = document.getElementById("racesBtn" + index);
    const deleteBtn = document.getElementById("deleteBtn" + index);


    editBtn.addEventListener("click", () => {
        editBoat(data)
    })

    deleteBtn.addEventListener("click", () => {
        deleteBoat(data)
    })

}
