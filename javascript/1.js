function bla (){
    console.log("Olá mundão perdido!")
}

b=document.querySelector("button:nth-child(4)");
b.innerHTML="click em mim"
b.addEventListener("click", bla)
