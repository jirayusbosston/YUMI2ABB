xhr = new XMLHttpRequest();
xhr2 = new XMLHttpRequest();
xhr3 = new XMLHttpRequest();
xhr4 = new XMLHttpRequest();
xhr5 = new XMLHttpRequest();
xhr6 = new XMLHttpRequest();
let list;
let Pos1, Pos2, Pos3;
let CurrentOrder = "";
let progress = 0;

function checkOrder() {
    xhr.open("GET", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json?print=pretty", false);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            list = JSON.parse(this.responseText);
            idList = [];

            var ul = document.getElementById("QueueField");

            while (ul.lastElementChild) {
                ul.removeChild(ul.lastElementChild);
            }

            if (list != null) {
                Object.keys(list).forEach(key => {
                    idList.push(key);
                    if (key != CurrentOrder) {
                        var NameQ = document.createElement("h4");
                        NameQ.setAttribute("class", "card-title");
                        NameQ.appendChild(document.createTextNode(list[key]['Name']));

                        var FlavorT = document.createElement("b");
                        FlavorT.setAttribute("class", "card-text text-end");
                        FlavorT.appendChild(document.createTextNode(['Milk Ice Cream']));

                        var FlavorQ = document.createElement("img");
                        FlavorQ.setAttribute("class", "rounded mx-3");
                        FlavorQ.setAttribute("src", "pic/Milkicecream.png");
                        FlavorQ.setAttribute("height", "50");

                        let col1 = document.createElement("div");
                        col1.setAttribute("class", "col-4");

                        let col2 = document.createElement("div");
                        col2.setAttribute("class", "col-8 text-end");

                        let row = document.createElement("div");
                        row.setAttribute("class", "row");

                        col1.appendChild(NameQ);
                        col2.appendChild(FlavorT);
                        col2.appendChild(FlavorQ);

                        row.appendChild(col1);
                        row.appendChild(col2);

                        let card = document.createElement("div");
                        card.setAttribute("class", "card-body");
                        card.appendChild(row);
                        ul.appendChild(card);
                    }
                });
            }

            GetCurrent();
            GetStatus();
        }
    };
}

function GetCurrent() {
    xhr2.open("GET", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status/CurrentOrder.json?print=pretty", true);
    xhr2.send();

    xhr2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            CurrentOrder = JSON.parse(this.responseText);
            console.log("GetCurrent() - CurrentOrder:", CurrentOrder);
            if (list != null && list.hasOwnProperty(CurrentOrder)) {
                document.getElementById("cName").innerHTML = list[CurrentOrder]['Name'];
            }

            if (CurrentOrder == "Empty") {
                document.getElementById("ProcessField").setAttribute("class", "card border-danger");
                document.getElementById("processing").setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
                document.getElementById("processing").setAttribute("style", "width: 0%");
                document.getElementById("cStatus").innerHTML = "^^";
                document.getElementById("cName").innerHTML = "Welcome";
            }
        }
    };
}

function GetStatus() {
    xhr3.open("GET", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json?print=pretty", true);
    xhr3.send();

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let Status = JSON.parse(this.responseText);

            console.log("GetStatus() - Status:", Status);
            
            // Add logging here to track changes to image src
            let Pos1Img = document.getElementById("Pos1Img").getAttribute("src");
            let Pos2Img = document.getElementById("Pos2Img").getAttribute("src");
            let Pos3Img = document.getElementById("Pos3Img").getAttribute("src");
            console.log("Pos1 Image src:", Pos1Img);
            console.log("Pos2 Image src:", Pos2Img);
            console.log("Pos3 Image src:", Pos3Img);

            document.getElementById("cStatusTitle").innerHTML = Status["Command"];

            if (Status["Command"] == "Processing") {
                document.getElementById("ProcessField").setAttribute("class", "card border-danger");
                document.getElementById("processing").setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
                document.getElementById("cStatus").innerHTML = "Please wait.";
            } else if (Status["Command"] == "Finish") {
                progress = 100;
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
                document.getElementById("ProcessField").setAttribute("class", "card border-success");
                document.getElementById("cStatus").innerHTML = "Enjoy. Have a nice day. :)";
                document.getElementById("processing").setAttribute("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
            } else if (Status["Command"] == "Ready") {
                progress = 0;
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
            }

            Pos1 = Status["Pos1"];
            if (Pos1 != "Empty") {
                document.getElementById("Pos1Name").innerHTML = Pos1["Name"];
                document.getElementById("Pos1Flavor").innerHTML = Pos1["Milk Icecream"];
                document.getElementById("Pos1Img").setAttribute("src", "pic/Milkicecream.png");
                document.getElementById("Pos1Img").setAttribute("width", "125");
            } else {
                document.getElementById("Pos1Name").innerHTML = "";
                document.getElementById("Pos1Img").setAttribute("src", "");
            }

            Pos2 = Status["Pos2"];
            if (Pos2 != "Empty") {
                document.getElementById("Pos2Name").innerHTML = Pos2["Name"];
                document.getElementById("Pos2Flavor").innerHTML = Pos2["Milk Icecream"];
                document.getElementById("Pos2Img").setAttribute("src", "pic/Milkicecream.png");
                document.getElementById("Pos2Img").setAttribute("width", "125");
            } else {
                document.getElementById("Pos2Name").innerHTML = "";
                document.getElementById("Pos2Img").setAttribute("src", "");
            }

            Pos3 = Status["Pos3"];
            if (Pos3 != "Empty") {
                document.getElementById("Pos3Name").innerHTML = Pos3["Name"];
                document.getElementById("Pos3Flavor").innerHTML = Pos3["Milk Icecream"];
                document.getElementById("Pos3Img").setAttribute("src", "pic/Milkicecream.png");
                document.getElementById("Pos3Img").setAttribute("width", "125");
            } else {
                document.getElementById("Pos3Name").innerHTML = "";
                document.getElementById("Pos3Img").setAttribute("src", "");
            }

            progress = Number(Status["Progress"]);
        }
    };
}
