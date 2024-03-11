let count = 0;

document.getElementById("increcebtn").onclick = function(){
    count+=1;
    document.getElementById("counterLabel").innerHTML = count;
}
document.getElementById("decresebtn").onclick = function(){
    count-=1;
    document.getElementById("counterLabel").innerHTML = count;
}
