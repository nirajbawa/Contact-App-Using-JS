

class model {
    constructor() {

        this.db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    }
    addNewContact(name, number) {
        this.db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (name varchar(50) unique, num varchar(10) unique)');
            tx.executeSql(`INSERT INTO contacts (name, num) VALUES ("${name}", "${number}")`);
        });
    }
    deleteContact(id) {
        this.db.transaction(function (tx) {
            tx.executeSql(`delete from contacts where num="${id}"`);
        });
    }
    updateContact(id, name, uid) {
        this.db.transaction(function (tx) {
            tx.executeSql(`update contacts set name="${name}", num="${id}" where num="${uid}" `);
        });
    }
    showAllContacts() {
        this.db.transaction(function (tx) {

            tx.executeSql('SELECT * FROM contacts', [], function (tx, results) {
                let table = document.getElementById("tb1").childNodes[3];
                for (let i = 0; i < results.rows.length; i++) {
                    //    this.data = [results.rows.item(i)];
                    let row = document.createElement("tr");
                    let th = document.createElement("th");
                    let td0 = document.createElement("td");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");

                    th.innerText = i + 1;
                    td0.innerText = results.rows.item(i).name;
                    td1.innerHTML = results.rows.item(i).num;
                    td2.innerHTML = `<button type="button" class="btn btn-danger" style="font-size: 15px; margin:2px" onClick="deleteCon('${results.rows.item(i).num}')">Delete</button> <button type="button" class="btn btn-success" style="font-size: 15px;" onClick="update('${results.rows.item(i).num}', '${results.rows.item(i).name}')" data-bs-toggle="modal" data-bs-target="#update">Update</button>`;


                    row.appendChild(th);
                    row.appendChild(td0);
                    row.appendChild(td1);
                    row.appendChild(td2);

                    table.appendChild(row);
                    console.log(table)
                }
            }, null);
        });
    }

    search(key) {
        this.db.transaction(function (tx) {

            tx.executeSql(`SELECT * FROM contacts where name like "%${key}%" or num like "%${key}%"`, [], function (tx, results) {
                let table = document.getElementById("tb2").childNodes[3];
                for (let i = 0; i < results.rows.length; i++) {
                    let row = document.createElement("tr");

                    let td0 = document.createElement("td");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");
                    console.log(results.rows.item(i))

                    td0.innerText = results.rows.item(i).name;
                    td1.innerHTML = results.rows.item(i).num;
                    td2.innerHTML = `<button type="button" class="btn btn-danger" style="font-size: 15px;" onClick="deleteCon('${results.rows.item(i).num}')">Delete</button>`;



                    row.appendChild(td0);
                    row.appendChild(td1);
                    row.appendChild(td2);

                    table.appendChild(row);
                    console.log(table)
                }
            }, null);
        });
    }


}

