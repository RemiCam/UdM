/* Rémi Campagnie 0983980*/


var fs = require("fs");


//
var contenuSalaire = fs.readFileSync("salaires.csv").toString();
var tabSalaire = contenuSalaire.split("\n");
for(var i=0 ; i<tabSalaire.length ; i++){tabSalaire[i]=tabSalaire[i].split(";");}
function salaire(name,salaire){
    this.name=name;
    this.salaire=salaire;
}
for (var i=0 ; i<tabSalaire.length ; i++){tabSalaire[i]=new salaire(tabSalaire[i][0],tabSalaire[i][1]);}


//
var contenuHeure = fs.readFileSync("heures.csv").toString();
var tabHeure = contenuHeure.split("\n");
for(var i=0 ; i<tabHeure.length ; i++){tabHeure[i]=tabHeure[i].split(";");}
function heure(name,heure){
    this.name=name;
    this.heure=heure;
}
for (var i=0 ; i<tabHeure.length ; i++){tabHeure[i]=new heure(tabHeure[i][0],tabHeure[i][1]);}


//
var toWrite="";
for(var i=0 ; i<tabSalaire.length ; i++){
    var salMens = 0;
    for(var j=0 ; j<tabHeure.length ; j++){
        if(tabSalaire[i].name==tabHeure[j].name){salMens=tabSalaire[i].salaire*tabHeure[j].heure;}
    }
    toWrite=toWrite.concat(tabSalaire[i].name + ": payer " + salMens + "$\n");
    //toWrite=toWrite.concat(tabSalaire[i].name + ": payer " + salMens + "$" + System.getProperty("line.separator"));
}
fs.writeFileSync("rapport.txt",toWrite);