let from=document.getElementById("from");
let to=document.getElementById("to");
let result=document.getElementById("result");
let input=document.getElementById("input");
let recordList=document.getElementById("recordList");
console.log(exchange);
function createOption(x,y,z){
    let o=document.createElement("option");
    let t=document.createTextNode(y);
    o.setAttribute("value",toNumber(z))
    o.appendChild(t);
    x.appendChild(o);
}
function toNumber(x){
    return Number(x.replace(',',""));
}
for (x in exchange.rates) {
    createOption(from,x,exchange.rates[x]);
    createOption(to,x,exchange.rates[x]);
    // console.log(x,exchange.rates[x]);      
}

document.getElementById("middle").addEventListener("submit",function(e){
    e.preventDefault();
    //get state
    let x=input.value;
    let y=from.value;
    let z=to.value;
    let fromTxt=x+" "+from.options[from.selectedIndex].innerHTML;
    let toTxt=to.options[to.selectedIndex].innerHTML;
    //process state
    let first=x*y;
    let second=first/z;
    let total=second.toFixed(2)+" "+toTxt;
    //set state
    result.innerHTML=total;
    input.value="";
    from.value="";
    to.value="1";
    input.focus();
    let date=new Date().toLocaleString();

    let arr=[date,fromTxt,toTxt,total];
    show(arr);
    save();
});

function save(){
    localStorage.setItem("history",recordList.innerHTML);
};
//IIFE function
(function(){
    if(localStorage.getItem("history")){
        recordList.innerHTML = localStorage.getItem("history");
    }else{
        recordList.innerHTML = `<tr id="rowSpacer"><td colspan="4">There is no history!</td></tr>`
    }
})()
function show(item){
    let rowSpacer=document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }
    let tRow=document.createElement("tr");
    item.map(function(el){
        let tData=document.createElement("td");
        let tTxt=document.createTextNode(el);
        tData.appendChild(tTxt);
        tRow.appendChild(tData);
        recordList.appendChild(tRow);
    });
}
function changeMode(){
    document.body.classList.toggle("night-mode");
    document.getElementById("modeIcon").classList.toggle("fa-sun");
}