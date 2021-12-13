<?php
    $html = new DOMDocument();
    $html->loadHTMLFile('index.html');
    // $html->getElementById("出力")->nodeValue = $_GET['key'];  //operaciones

    $buscador = new DomXPath($html);
    $nombreclase="areaEditable";
    $nodosByClassName = $buscador->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $nombreclase ')]");

    for($i=0; $i<count($_GET); $i++){
        // echo $_GET['dato'.$i];          //dato0 dato1 dato2 ...
        $nodosByClassName[$i]->nodeValue = htmlspecialchars($_GET['dato'.$i]);   // codificar < > y operar
    }
    
    $本 = fopen("index.html","w") or die("hay fallo!");
    $文字列 = $html->saveHTML();                    // guardar en string
    fwrite($本, htmlspecialchars_decode($文字列));  // deCodificar y exportar
    fclose($本);
    
    header("Location: index.html");         //redireccionar webpage
    die();
?>
