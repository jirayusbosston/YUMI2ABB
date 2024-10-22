xhr = new XMLHttpRequest
xhr2 = new XMLHttpRequest
xhr3 = new XMLHttpRequest
xhr4 = new XMLHttpRequest
xhr5 = new XMLHttpRequest
xhr6 = new XMLHttpRequest
let list
let Pos1
let Pos2
let Pos3
let CurrentOrder = ""
let progress = 0

//document.getElementById("processing").setAttribute("aria-valuenow",Number(progress))

function checkOrder() {



    xhr.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json?print=pretty", false)
    xhr.send()

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            list = JSON.parse(this.responseText)
            idList = []

            var ul = document.getElementById("QueueField");

            while (ul.lastElementChild) {
                ul.removeChild(ul.lastElementChild);
            }


            if (list != null) {
                Object.keys(list).forEach(key => {
                    idList.push(key)
                    if (key != CurrentOrder) {
                        var NameQ = document.createElement("h4");
                        NameQ.setAttribute("Class", "card-title")
                        NameQ.appendChild(document.createTextNode(list[key]['Name']));
                        var FlavorQ = document.createElement("b")
                        FlavorQ.setAttribute("Class", "card-text text-end")

                        var ToppingQ = document.createElement("img")
                        ToppingQ.setAttribute("Class", "rounded mx-3")
                        if (list[key]['Topping'] == "top1") {
                            FlavorQ.appendChild(document.createTextNode(list[key]['Flavor'] + " Ice Cream with Wafer Stick"));
                            ToppingQ.setAttribute("src", "pic/Topping 1.png")
                            ToppingQ.setAttribute("height", "50")
                        } else if (list[key]['Topping'] == "top2") {
                            FlavorQ.appendChild(document.createTextNode(list[key]['Flavor'] + " Ice Cream with Corn Flake"));
                            ToppingQ.setAttribute("src", "pic/Topping 2.png")
                            ToppingQ.setAttribute("height", "50")
                        } else if (list[key]['Topping'] == "top3") {
                            FlavorQ.appendChild(document.createTextNode(list[key]['Flavor'] + " Ice Cream with Biscoff Crumble"));
                            ToppingQ.setAttribute("src", "pic/Topping 3.png")
                            ToppingQ.setAttribute("height", "30")
                        }

                        col1 = document.createElement("div")
                        col1.setAttribute("Class", "col-4")
                        col2 = document.createElement("div")
                        col2.setAttribute("Class", "col-8 text-end")
                        row = document.createElement("div")
                        row.setAttribute("Class", "row")
                        col1.appendChild(NameQ)
                        col2.appendChild(FlavorQ)
                        col2.appendChild(ToppingQ)
                        row.appendChild(col1)
                        row.appendChild(col2)

                        card = document.createElement("div");
                        card.setAttribute("Class", "card-body")
                        card.appendChild(row)
                        ul.appendChild(card)
                    }

                });
                //ul.removeChild(ul.firstElementChild)
            }

            // <div class="card-body">
            //         <div class="row">
            //             <div class="col-6">
            //                 <h4 class="card-title">John Doe</h4>
            //             </div>

            //             <div class="col-6 text-end">
            //                 <b class="card-text text-end">Milk Ice cream</b>
            //             </div>
            //         </div>
            //     </div>

            // document.getElementById("CurrentOrder").innerHTML = JSON.stringify(list[idList[0]])


            // xhr2.open("PATCH", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json", true)
            //obj = '{"CurrentOrder":"'+CurrentOrder+'"}'
            //xhr2.send(obj)
            GetCurrent();
            //GetPos1();
            //GetPos2();
            //GetPos3();
            GetStatus();
           //GetProgress();
            //console.log(this.responseText)
        }
    };
}

function AddOrderMilk() {
    xhr3.open("POST", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json", false)
    obj = '{ "Name": "' + document.getElementById("Name").value + '" ,"Flavor": "Milk"}'

    xhr3.send(obj)

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            //checkOrder();
        }
    };

}

function AddOrderChoc() {
    xhr3.open("POST", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json", false)
    obj = '{ "Name": "' + document.getElementById("Name").value + '" ,"Flavor": "Chocolate"}'

    xhr3.send(obj)

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            //checkOrder();
        }
    };

}



function GetCurrent() {
    xhr2.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/CurrentOrder.json?print=pretty", true)
    xhr2.send()

    xhr2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            //document.getElementById("CurrentOrder").innerHTML = this.responseText
            CurrentOrder = JSON.parse(this.responseText)
            console.log(CurrentOrder)
            if (list != null) {
                if (list.hasOwnProperty(CurrentOrder)) {
                    document.getElementById("cName").innerHTML = list[CurrentOrder]['Name']
                    console.log(list[CurrentOrder]['Name'])
                }

            }
            else {

            }

            if (CurrentOrder == "Empty") {
                document.getElementById("ProcessField").setAttribute("Class", "card border-danger")
                document.getElementById("processing").setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated")
                //progress++
                document.getElementById("processing").setAttribute("style", "width: 0%")
                document.getElementById("cStatus").innerHTML = "^^"
                document.getElementById("cName").innerHTML = "Welcome"
            }


        }
    };
}
function GetStatus() {
    xhr3.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json?print=pretty", true)
    xhr3.send()

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            //document.getElementById("CurrentOrder").innerHTML = this.responseText
            Status = JSON.parse(this.responseText)
            document.getElementById("cStatusTitle").innerHTML = Status["Command"];
            console.log(Status["Command"])
            if (Status["Command"] == "Processing") {
                document.getElementById("ProcessField").setAttribute("Class", "card border-danger")
                document.getElementById("processing").setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated")
                //progress++
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%")
                document.getElementById("cStatus").innerHTML = "Please wait."
            } else if (Status["Command"] == "Finish") {
                progress = 100
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%")
                document.getElementById("ProcessField").setAttribute("Class", "card border-success")
                document.getElementById("cStatus").innerHTML = "Enjoy. Have a nice day. :)"
                document.getElementById("processing").setAttribute("class", "progress-bar bg-success progress-bar-striped progress-bar-animated")
            } else if (Status["Command"] == "Ready") {
                progress = 0
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%")
            }

            Pos1 = Status["Pos1"]
            if (Pos1 != "Empty") {
                document.getElementById("Pos1Name").innerHTML = Pos1["Name"]

                if (Pos1['Topping'] == "top1") {
                    document.getElementById("Pos1Top").setAttribute("src", "pic/Topping 1.png")
                    document.getElementById("Pos1Top").setAttribute("width", "125")
                    document.getElementById("Pos1Flavor").innerHTML = Pos1["Flavor"] + " Icecream with Wafer stick"
                } else if (Pos1['Topping'] == "top2") {
                    document.getElementById("Pos1Top").setAttribute("src", "pic/Topping 2.png")
                    document.getElementById("Pos1Top").setAttribute("width", "100")
                    document.getElementById("Pos1Flavor").innerHTML = Pos1["Flavor"] + " Icecream with Cornflake"
                } else if (Pos1['Topping'] == "top3") {
                    document.getElementById("Pos1Top").setAttribute("src", "pic/Topping 3.png")
                    document.getElementById("Pos1Top").setAttribute("width", "125")
                    document.getElementById("Pos1Flavor").innerHTML = Pos1["Flavor"] + " Icecream with Biscoff crumble"
                }
                document.getElementById("Pos1Top").setAttribute("Class", "img-fluid rounded mx-auto")
            } else {
                document.getElementById("Pos1Name").innerHTML = ""
                document.getElementById("Pos1Flavor").innerHTML = "Empty"
                document.getElementById("Pos1Top").setAttribute("src", " ")
            }

            Pos2 = Status["Pos2"]
            if (Pos2 != "Empty") {
                document.getElementById("Pos2Name").innerHTML = Pos2["Name"]

                if (Pos2['Topping'] == "top1") {
                    document.getElementById("Pos2Top").setAttribute("src", "pic/Topping 1.png")
                    document.getElementById("Pos2Top").setAttribute("width", "125")
                    document.getElementById("Pos2Flavor").innerHTML = Pos2["Flavor"] + " Icecream with Wafer stick"
                } else if (Pos2['Topping'] == "top2") {
                    document.getElementById("Pos2Top").setAttribute("src", "pic/Topping 2.png")
                    document.getElementById("Pos2Top").setAttribute("width", "100")
                    document.getElementById("Pos2Flavor").innerHTML = Pos2["Flavor"] + " Icecream with Cornflake"
                } else if (Pos2['Topping'] == "top3") {
                    document.getElementById("Pos2Top").setAttribute("src", "pic/Topping 3.png")
                    document.getElementById("Pos2Top").setAttribute("width", "125")
                    document.getElementById("Pos2Flavor").innerHTML = Pos2["Flavor"] + " Icecream with Biscoff crumble"
                }
                document.getElementById("Pos2Top").setAttribute("Class", "img-fluid rounded mx-auto")
            } else {
                document.getElementById("Pos2Name").innerHTML = ""
                document.getElementById("Pos2Flavor").innerHTML = "Empty"
                document.getElementById("Pos2Top").setAttribute("src", " ")
            }

            Pos3 = Status["Pos3"]
            if (Pos3 != "Empty") {
                document.getElementById("Pos3Name").innerHTML = Pos3["Name"]

                if (Pos3['Topping'] == "top1") {
                    document.getElementById("Pos3Top").setAttribute("src", "pic/Topping 1.png")
                    document.getElementById("Pos3Top").setAttribute("width", "125")
                    document.getElementById("Pos3Flavor").innerHTML = Pos3["Flavor"] + " Icecream with Wafer stick"
                } else if (Pos3['Topping'] == "top2") {
                    document.getElementById("Pos3Top").setAttribute("src", "pic/Topping 2.png")
                    document.getElementById("Pos3Top").setAttribute("width", "100")
                    document.getElementById("Pos3Flavor").innerHTML = Pos3["Flavor"] + " Icecream with Cornflake"
                } else if (Pos3['Topping'] == "top3") {
                    document.getElementById("Pos3Top").setAttribute("src", "pic/Topping 3.png")
                    document.getElementById("Pos3Top").setAttribute("width", "125")
                    document.getElementById("Pos3Flavor").innerHTML = Pos3["Flavor"] + " Icecream with Biscoff crumble"
                }
                document.getElementById("Pos3Top").setAttribute("Class", "img-fluid rounded mx-auto")
            } else {
                document.getElementById("Pos3Name").innerHTML = ""
                document.getElementById("Pos3Flavor").innerHTML = "Empty"
                document.getElementById("Pos3Top").setAttribute("src", " ")
            }

            progress = Number(Status["Progress"])

        }
    };
}

function GetPos1() {
    xhr4.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/Pos1.json?print=pretty", true)
    xhr4.send()

    xhr4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {


            Pos1 = JSON.parse(this.responseText)
            document.getElementById("Pos1Name").innerHTML = Pos1["Name"]

            if (Pos1['Topping'] == "top1") {
                document.getElementById("Pos1Top").setAttribute("src", "pic/Topping 1.png")
                document.getElementById("Pos1Top").setAttribute("width", "125")
                document.getElementById("Pos1Flavor").innerHTML = Pos1["Flavor"] + " Icecream with Wafer stick"
            } else if (Pos1['Topping'] == "top2") {
                document.getElementById("Pos1Top").setAttribute("src", "pic/Topping 2.png")
                document.getElementById("Pos1Top").setAttribute("width", "125")
                document.getElementById("Pos1Flavor").innerHTML = Pos1["Flavor"] + " Icecream with Cornflake"
            } else if (Pos1['Topping'] == "top3") {
                document.getElementById("Pos1Top").setAttribute("src", "pic/Topping 3.png")
                document.getElementById("Pos1Top").setAttribute("width", "125")
                document.getElementById("Pos1Flavor").innerHTML = Pos1["Flavor"] + " Icecream with Biscoff crumble"
            }
            document.getElementById("Pos1Top").setAttribute("Class", "img-fluid rounded mx-auto")

            // console.log(Pos1)

        }
    };
}

function GetPos2() {
    xhr5.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/Pos2.json?print=pretty", true)
    xhr5.send()

    xhr5.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Pos2 = JSON.parse(this.responseText)
            document.getElementById("Pos2Name").innerHTML = Pos2["Name"]

            if (Pos2['Topping'] == "top1") {
                document.getElementById("Pos2Top").setAttribute("src", "pic/Topping 1.png")
                document.getElementById("Pos2Top").setAttribute("width", "125")
                document.getElementById("Pos2Flavor").innerHTML = Pos2["Flavor"] + " Icecream with Wafer stick"
            } else if (Pos2['Topping'] == "top2") {
                document.getElementById("Pos2Top").setAttribute("src", "pic/Topping 2.png")
                document.getElementById("Pos2Top").setAttribute("width", "125")
                document.getElementById("Pos2Flavor").innerHTML = Pos2["Flavor"] + " Icecream with Cornflake"
            } else if (Pos2['Topping'] == "top3") {
                document.getElementById("Pos2Top").setAttribute("src", "pic/Topping 3.png")
                document.getElementById("Pos2Top").setAttribute("width", "125")
                document.getElementById("Pos2Flavor").innerHTML = Pos2["Flavor"] + " Icecream with Biscoff crumble"
            }
            document.getElementById("Pos2Top").setAttribute("Class", "img-fluid rounded mx-auto")
        }
    };
}

function GetPos3() {
    xhr6.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/Pos3.json?print=pretty", true)
    xhr6.send()

    xhr6.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            Pos3 = JSON.parse(this.responseText)
            document.getElementById("Pos3Name").innerHTML = Pos3["Name"]

            if (Pos3['Topping'] == "top1") {
                document.getElementById("Pos3Top").setAttribute("src", "pic/Topping 1.png")
                document.getElementById("Pos3Top").setAttribute("width", "125")
                document.getElementById("Pos3Flavor").innerHTML = Pos3["Flavor"] + " Icecream with Wafer stick"
            } else if (Pos3['Topping'] == "top2") {
                document.getElementById("Pos3Top").setAttribute("src", "pic/Topping 2.png")
                document.getElementById("Pos3Top").setAttribute("width", "125")
                document.getElementById("Pos3Flavor").innerHTML = Pos3["Flavor"] + " Icecream with Cornflake"
            } else if (Pos3['Topping'] == "top3") {
                document.getElementById("Pos3Top").setAttribute("src", "pic/Topping 3.png")
                document.getElementById("Pos3Top").setAttribute("width", "125")
                document.getElementById("Pos3Flavor").innerHTML = Pos3["Flavor"] + " Icecream with Biscoff crumble"
            }
            document.getElementById("Pos3Top").setAttribute("Class", "img-fluid rounded mx-auto")
        }
    };
}

function GetProgress() {
    xhr5.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/Progress.json?print=pretty", true)
    xhr5.send()

    xhr5.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            //document.getElementById("Pos2").innerHTML = this.responseText
            progress = Number(JSON.parse(this.responseText))

        }
    };
}

