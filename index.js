document.getElementById("Form").addEventListener("submit", (e) => {
    e.preventDefault();
})

let obj;

document.body.onload = () => {


    obj = new model();

    obj.showAllContacts();


    document.addEventListener("change", (e) => {
        console.log(e.target.value)
        obj.search(e.target.value)
    });
}


function addNew() {
    console.log("hii")
    let Sname = document.getElementById("Sname").value;
    let Snum = document.getElementById("Snum").value;

    if (Sname != "" && Snum != "") {
        obj.addNewContact(Sname, Snum);
        document.getElementById("Sname").value = "";
        document.getElementById("Snum").value = "";
        alert("New contact added");
        document.getElementById("tbody").innerHTML = "";
        obj.showAllContacts();
    }
    else {
        alert("Please fill all fields");
    }
}

function deleteCon(id) {

    let al = confirm("Please press ok for delete the item");
    if (al) {
        console.log(id);
        obj.deleteContact(id);
        document.getElementById("tbody").innerHTML = "";
        obj.showAllContacts();
    }
}



function update(nu, na) {
    console.log("hii");
    console.log(na + nu)
    document.getElementById("Uname").value = na;
    document.getElementById("Unum").value = nu;
    document.getElementById("Uid").value = nu;
}

function UpdateData() {
    let name = document.getElementById("Uname").value;
    let num = document.getElementById("Unum").value;
    let Uid = document.getElementById("Uid").value
    console.log(name)
    console.log(num)
    console.log(Uid)
    obj.updateContact(num, name, Uid);
    alert("Contact updated added");
    document.getElementById("tbody").innerHTML = "";
    obj.showAllContacts();
}