function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

const popup = document.querySelector("dialog")

async function fetchBoats() {
    const url = "http://localhost:8080/sailboats"
    const data = await fetchAny(url)
    tableBody.innerHTML = ""
    data.forEach(putDataInTableWButton)
}

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

const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
    popup.close();
})


function editBoat(data) {
    popup.showModal()
    console.log("editboat")

    const nameField = document.getElementById("name")
    nameField.value = data.name

    const boatTypeField = document.getElementById("boatType")
    boatTypeField.value = data.boatType

    const submitBoat = document.getElementById("postBoat");

    submitBoat.addEventListener("submit", upBoat);
    debugger

    //tilføjer hidden id felt til formen
    const form = document.getElementById("postBoat")
    const idField = document.createElement("input")
    idField.type = "hidden"
    idField.name = "boatID"
    idField.value = data.boatID
    form.appendChild(idField)
}

function upBoat() {
    console.log("upBoat")

    updateBoat()
}

async function updateBoat() {
    //event.preventDefault();
    //const form = event.currentTarget
    const form = document.getElementById("postBoat");
    debugger
    console.log("Update boatxxxxxxxxx")
    const formData = new FormData(form)
    const newObject = Object.fromEntries(formData.entries())
    const url = "http://localhost:8080/sailboat/" + newObject.boatID;
    const updatedData = {
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(newObject)
    }
    //calls backend and wait for return
    const response = await fetch(url, updatedData);
    if (!response.ok) {
        alert("Det gik ikke godt med update");
    }
    else {
        alert("Data er opdateret");
        popup.close();
        fetchBoats();
    }
    return response;
}

async function deleteBoat(data) {
    const confirmDelete = confirm("Er du sikker på du vil slette " + data.name + "?")
    if (confirmDelete) {
        const url = "http://localhost:8080/sailboat/" + data.boatID
        const deleteData = {
            method: "DELETE",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        }
        const response = await fetch(url, deleteData)
        if (!response.ok) {
            alert("Kunne ikke slette")
        } else {
            fetchBoats()
        }
        return response
    }
}



fetchBoats()