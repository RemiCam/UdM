/*Rémi Campagnie 0983980*/

/*repete n fois le charcatère t*/
function repeter(n, t){
    var resultat="";  //la valeur retourné à la fin de la fonction
    for(var i=0 ; i<n ; i++){resultat+=t;};
    return resultat;
}

/*affiche 1 chiffre du nombre x en charactère romain.
  x             est le nombre que l'on veut convertir
  pos           est la valeur de position ∈ {10^0 ; 10^1 ; 10^2 ; 10^3}
  c1, c5 et c10 sont respectivement les charactères romain pour 1*pos, 5*pos et 10*pos  */
function chiffre(x, pos, c1, c5, c10){
    var aConvertir = Math.floor( x%(pos*10)/pos );  //le chiffre à convertir
    if (aConvertir <=3 ){return repeter(aConvertir, c1);}
    else if (aConvertir == 4){return c1+c5;}
    else if (aConvertir <=8){return c5+repeter(aConvertir-5, c1);}
    else {return c1+c10;}
}

/*transforme x en nombre romain. x ∈ [1,3999]*/
function romain(x){
    var nbRo="";  //nombre romain (valeur retourné)
    var pos = 1; //on commence par les unitées
    var c1, c5, c10;
    x=""+x;  //transforme x en string
    
    for(var i=x.length-1 ; i>=0 ; i--){
        switch(pos){
            case 1:
                c1="I";
                c5="V"; 
                c10="X";
                break;
            case 10:
                c1="X";
                c5="L"; 
                c10="C";
                break;
            case 100:
                c1="C";
                c5="D";
                c10="M";
                break;
            case 1000:
                c1="M";
        }
        nbRo = chiffre(x,pos,c1,c5,c10)+nbRo;
        pos *= 10;
    }
    return nbRo;
}

function testRomain(){
    assert(romain(439) == "CDXXXIX");
    assert(romain(2948) == "MMCMXLVIII");
    assert(romain(0) == "");
    assert(romain(3999) == "MMMCMXCIX");
    assert(romain(3888) == "MMMDCCCLXXXVIII");
    assert(romain(2018) == "MMXVIII");
    assert(romain(0666) == "DCLXVI");
    assert(romain(1) == "I");
    assert(romain(10) == "X");
    assert(romain(100) == "C");
    assert(romain(1000) == "M");
}
           
testRomain()