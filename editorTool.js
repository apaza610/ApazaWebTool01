/*****************   mostrar/ocultar/mover menuCapitulos *********************************/
var lEditores = document.getElementsByClassName("areaEditable");
var bMuestraEditor = false;

function moverEditor(){
    [...lEditores].forEach((elemento)=>{
        elemento.style.position = bMuestraEditor? "static" : "absolute";
        elemento.style.top = "2rem";
        elemento.style.opacity = bMuestraEditor? 1 : 0.85;
    });
    bMuestraEditor = !bMuestraEditor;
}

/************************** editor **********************************/
var bEditable = false;
document.onkeydown = (e)=>{ 
    if(e.altKey && e.key == 'x') hacerEditable(document.getElementById("edt"));
     else if(e.altKey && e.key == 'c') mqnTiempo();
     else if(e.altKey && e.key === 'z') moverEditor();
     else if(e.ctrlKey && e.key == 's'){
         e.preventDefault();
         grabarConPHP();
     }
}
function hacerEditable(mnemonico){
    [...lEditores].forEach((elemento)=>{
        elemento.contentEditable = bEditable? "false" : "true";
    });
    mnemonico.style.color = bEditable? "blue" : "red";
    mnemonico.style.textDecoration = bEditable? "line-through" : "none";
    bEditable = !bEditable;
}
function grabarConPHP(){
    // let contenido = document.getElementById("出力").innerHTML;
    let mensaje = "";   //dato1=bla bla bla &dato2=jeje jeje &dato3=sdkllkd slkdfl
    [...lEditores].forEach((elemento, iterador)=>{
        mensaje += `dato${iterador}=${elemento.innerHTML}`
        mensaje += "&";
    });
    window.location.replace("grabador.php?" + mensaje);
}
function darFormato(elTag, laClase=""){
    let seleccion, rango;
    seleccion = window.getSelection();
    rango = seleccion.getRangeAt(0);

    var 外 = document.createElement(elTag);
    var 中 = document.createTextNode(seleccion.toString());
    外.appendChild(中);

    if(laClase != "") 外.classList.add(laClase);

    rango.deleteContents();
    rango.insertNode(外);
}
function crearTimeStamp(){
    console.log("funca bien");
    let seleccion, rango;
    seleccion = window.getSelection();
    if( seleccion != "" ){
        rango = seleccion.getRangeAt(0);
        
        var 外 = document.createElement("button");
        var 中 = document.createTextNode(seleccion.toString());
        外.appendChild(中);
        外.classList.add("timeMachine");
    
        // let opcion1 = document.getElementById("reloj").innerText;       //入力 automatico
        let tiempo = document.getElementById("miTiempo").value;
        let nVid = document.getElementById("miVideo") .value;       // 0 1 2 ...
        外.setAttribute('onclick',`timeMachine(${tiempo}, ${nVid})`);
        
        rango.deleteContents();
        rango.insertNode(外);
    }else{ alert("debe seleccionar algun texto para reemplazarlo!!!"); }
}
function crearHiperlink(){
    let seleccion, rango;
    seleccion = window.getSelection();
    if( seleccion != "" ){
        rango = seleccion.getRangeAt(0);
        var 外 = document.createElement("a");
        var 中 = document.createTextNode(seleccion.toString());
        外.appendChild(中);
        外.setAttribute("href",document.getElementById("pathEnlace").value);
        rango.deleteContents();
        rango.insertNode(外);
    }else{ alert("debe seleccionar algun texto para reemplazarlo!!!"); }
}
function rawHTMLInsert(){   //reemplaza selected con cadena que puede contener <tags>
    let seleccion, rango;
    seleccion = window.getSelection();
    if( seleccion != "" ){
        rango = seleccion.getRangeAt(0);
                                                                                // <u>jeje</u>
        let miDocFragment = rango.createContextualFragment(document.getElementById("rawHTML").value);
        rango.deleteContents();
        rango.insertNode(miDocFragment);
    }else{ alert("debe seleccionar algun texto para reemplazarlo!!!"); }
    
    /*************metodo antiguo era:****************************/
    // let 外 = document.createElement("span");    //crear <span> temporal
    // rango.surroundContents(外);
    // 外.innerHTML = document.getElementById("rawHTML").value; // <span><u>jeje</u></span>

    // let papa = 外.parentNode;                   //pa liberarnos del <span> temporal
    // while(外.firstChild)
    //     papa.insertBefore(外.firstChild, 外);
    // papa.removeChild(外);                       // <u>jeje</u>
}
function inserta3cols(){
    let seleccion, rango;
    seleccion = window.getSelection();
    if( seleccion != "" ){
        rango = seleccion.getRangeAt(0);
    
        let miDocFragment = rango.createContextualFragment(`<div class="miFila"><div class="miClmn">...</div><div class="miClmn"></div><div class="miClmn"></div></div>..`);
        rango.deleteContents();
        rango.insertNode(miDocFragment);
    }else{ alert("debe seleccionar algun texto para reemplazarlo!!!"); }
}