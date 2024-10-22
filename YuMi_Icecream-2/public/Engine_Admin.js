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
CurrentOrder = ""
function checkOrder() {
    

    xhr.open("GET", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json?print=pretty", true)
    xhr.send()

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            list = JSON.parse(this.responseText)
            idList = []

            var ul = document.getElementById("Orderlist");
            
             while (ul.lastElementChild) {
                 ul.removeChild(ul.lastElementChild);
            }
            
            if(list != null)
                {
                    Object.keys(list).forEach(key => {
                        idList.push(key)
                        if (key != CurrentOrder) {
                            var NameQ = document.createElement("h4");
                        NameQ.setAttribute("Class","card-title")
                        NameQ.appendChild(document.createTextNode(list[key]['Name']));
                        var FlavorQ = document.createElement("b")
                        FlavorQ.setAttribute("Class","card-text text-end")
                        FlavorQ.appendChild(document.createTextNode(list[key]['Flavor']+" Ice Cream"));
                        col1 = document.createElement("div")
                        col1.setAttribute("Class","col-6")
                        col2 = document.createElement("div")
                        col2.setAttribute("Class","col-6 text-end")
                        row = document.createElement("div")
                        row.setAttribute("Class","row")
                        col1.appendChild(NameQ);
                        col2.appendChild(FlavorQ)
                        row.appendChild(col1)
                        row.appendChild(col2)

                        card = document.createElement("div");
                        card.setAttribute("Class","card-body")
                        card.appendChild(row)
                        ul.appendChild(card)
                        }
                        
                    });
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

           document.getElementById("CurrentOrder").innerHTML = JSON.stringify(list[idList[0]])
           CurrentOrder = idList[0]

           // xhr2.open("PATCH", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json", true)
            //obj = '{"CurrentOrder":"'+CurrentOrder+'"}'
            //xhr2.send(obj)
            GetCurrent();
            GetPos1();
            GetPos2();
            GetPos3();
            //console.log(this.responseText)
        }
    };
}

function AddOrderMilk() {
    xhr3.open("POST", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json", false)
    obj = '{ "Name": "'+document.getElementById("Name").value+'" ,"Flavor": "Milk"}'

    xhr3.send(obj)

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            //checkOrder();
        }
    };

}

function AddOrderChoc() {
    xhr3.open("POST", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json", false)
    obj = '{ "Name": "'+document.getElementById("Name").value+'" ,"Flavor": "Chocolate"}'

    xhr3.send(obj)

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            //checkOrder();
        }
    };

}

function FinishOrder() {
    xhr3.open("DELETE", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Queue/"+CurrentOrder+".json", false)
    

    xhr3.send()

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            //checkOrder();
        }
    };

}

function AssignOrdertoPos1(params) {
    xhr.open("PATCH", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json", true)
    //obj = '{ "Pos1": "'+CurrentOrder+'"}'
    obj = '{ "Pos1": {"Name":"'+list[CurrentOrder]["Name"]+'","Flavor":"'+list[CurrentOrder]["Flavor"]+'"}}'
    xhr.send(obj)

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            FinishOrder();
        }
    };

}

function AssignOrdertoPos2(params) {
    xhr.open("PATCH", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json", true)
    //obj = '{ "Pos1": "'+CurrentOrder+'"}'
    obj = '{ "Pos2": {"Name":"'+list[CurrentOrder]["Name"]+'","Flavor":"'+list[CurrentOrder]["Flavor"]+'"}}'
    xhr.send(obj)

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            FinishOrder();
        }
    };

}

function AssignOrdertoPos3(params) {
    xhr.open("PATCH", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json", true)
    //obj = '{ "Pos1": "'+CurrentOrder+'"}'
    obj = '{ "Pos3": {"Name":"'+list[CurrentOrder]["Name"]+'","Flavor":"'+list[CurrentOrder]["Flavor"]+'"}}'
    xhr.send(obj)

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            FinishOrder();
        }
    };

}

function FinishPos1(params) {
    xhr3.open("PATCH", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json", true)
    //obj = '{ "Pos1": "'+CurrentOrder+'"}'
    obj = '{ "Pos1": "Empty"}'
    xhr3.send(obj)

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            //checkOrder()
        }
    };

}

function FinishPos2(params) {
    xhr3.open("PATCH", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json", true)
    //obj = '{ "Pos1": "'+CurrentOrder+'"}'
    obj = '{ "Pos2": "Empty"}'
    xhr3.send(obj)

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            //checkOrder()
        }
    };

}

function FinishPos3(params) {
    xhr3.open("PATCH", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json", true)
    //obj = '{ "Pos1": "'+CurrentOrder+'"}'
    obj = '{ "Pos3": "Empty"}'
    xhr3.send(obj)

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText)
            //checkOrder()
        }
    };

}

function GetCurrent() {
    xhr.open("GET", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status/CurrentOrder.json?print=pretty", true)
    xhr.send()

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("CurrentOrder").innerHTML = this.responseText
            CurrentOrder = JSON.parse(this.responseText)
            //document.getElementById("cName").innerHTML = list[CurrentOrder]['Name']

        }
    };
}

function GetPos1() {
    xhr4.open("GET", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status/Pos1.json?print=pretty", true)
    xhr4.send()

    xhr4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("Pos1").innerHTML = this.responseText
            Pos1 = JSON.parse(this.responseText)
            
        }
    };
}

function GetPos2() {
    xhr5.open("GET", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status/Pos2.json?print=pretty", true)
    xhr5.send()

    xhr5.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("Pos2").innerHTML = this.responseText
            Pos2 = JSON.parse(this.responseText)
            
        }
    };
}

function GetPos3() {
    xhr6.open("GET", "https://yumi-clone-default-rtdb.asia-southeast1.firebasedatabase.app/Status/Pos3.json?print=pretty", true)
    xhr6.send()

    xhr6.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("Pos3").innerHTML = this.responseText
            Pos3 = JSON.parse(this.responseText)
            
        }
    };
}