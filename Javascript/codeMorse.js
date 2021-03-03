/* Rémi Campagnie 0983980 */

var codeMorse = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--",
                 "-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--..",
                 "-----",".----","..---","...--","....-",".....","-....","--...","---..","----."];
//contient les lettres de l'alphabet suivit des chiffres 0,1,2,...,9 en code morse


/* Encode un symbole valide en Morse. Si le symbole n'est pas valide, retourne une chaine vide */
function encoderCharMorse(c){
    c=c.toLowerCase();
    if (c.charCodeAt()>=97 && c.charCodeAt()<=122) {return codeMorse[c.charCodeAt()-97];} //"a" en num ASCII est 97
    else if (c.charCodeAt()>=48 && c.charCodeAt()<=57) {return codeMorse[c.charCodeAt()-22];} //"0"en num ASCII est 22
    return "";                                      //le symbole morse pour "0" se trouve a la position 26. -48+26=-22
}


/* Retourne la position d’un symbole en code Morse dans la table d’encodage
   Si le symbole n'est pas valide, retourne une chaine vide */
function chercherPos(c){
    for (var i=0 ; i<=codeMorse.length-1 ; i++){
        if (codeMorse[i]==c) {return i;}
    }
    return "";
}


/* Décode un symbole valide de Morse en caractère minuscule correspondant pour les lettres et en un chiffre pour les chiffres
   Si le symbole n'est pas valide, retourne une chaine vide */
function decoderCharMorse(c){
    var pos=chercherPos(c);
    if (pos<=25 && pos+""!="") {return String.fromCharCode(pos+97);} //pos+"" pour le cas où pos=0. 0!=""->false. "0"!=""->true
    else if (pos>25 && pos+""!="") {return String.fromCharCode(pos+22);}
    return "";
}


/* Encode une phrase complète */
function encoderMorse(s){
    s=s.toLowerCase();
    //encode la 1ère lettre de la phrase
    if (encoderCharMorse(s[0])!=""){var phrase=encoderCharMorse(s[0]);}
    else {var phrase=("!!!");}
    //encode le reste de la phrase
    for (var i=1; i<=s.length-1 ; i++){
        var c=encoderCharMorse(s[i]);
        if (c!="") {phrase=phrase.concat("!"+c);}
        else if (phrase[phrase.length-1]!="!") {phrase=phrase.concat("!!");}
    }
    //traite le cas où le dernier charactère n'est pas dans la table codeMorse
    if (phrase[phrase.length-1]=="!") {phrase=phrase.concat("!");}
    return phrase;
}


/* Décode une phrase encodée en Morse en lettres minuscules et(ou) chiffres en séparant les mots par un espace. */
function decoderMorse(s){
    var phrase="" , lenSymb=0; //lenSymb compte combien de charactère sont dans le symbole morse à décoder
    for (var i=0 ; i<=s.length-1 ; i++){
        if (s[i]!="!") {lenSymb++;}
        else if (lenSymb>0){
            phrase=phrase.concat(decoderCharMorse(s.slice(i-lenSymb,i)));
            lenSymb=0;
        }
        else {
            phrase=phrase.concat(" ");
            i++; //On a passé 2 charactère "!". On incremente i pour ne pas lire le 3ème "!"
        }
    }
    return phrase;
}


/* Test unitaire de toutes les functions */
function testerCodeMorse(){
    //test encoderCharMorse
    assert(encoderCharMorse("a")==".-");
    assert(encoderCharMorse("R")==".-.");
    assert(encoderCharMorse("0")=="-----");
    assert(encoderCharMorse("6")=="-....");
    assert(encoderCharMorse("%")=="");
    //test chercherPos
    assert(chercherPos(".-")=="0");
    assert(chercherPos(".-.")=="17");
    assert(chercherPos("-----")=="26"); //25+0+1
    assert(chercherPos("-....")=="32"); //25+6+1
    assert(chercherPos("---.--")=="");
    //test decoderCharMorse
    assert(decoderCharMorse(".-")=="a");
    assert(decoderCharMorse("-.-.")=="c");
    assert(decoderCharMorse("....-")=="4");
    assert(decoderCharMorse("%")=="");
    //test encoderMorse
    assert(encoderMorse("oui... j’ai sept chats!")=="---!..-!..!!!.---!!!.-!..!!!...!.!.--.!-!!!-.-.!....!.-!-!...!!!");
    assert(encoderMorse("AleNa")==".-!.-..!.!-.!.-");
    //test decoderMorse
    assert(decoderMorse("---!..-!..!!!.---!!!.-!..!!!...!.!.--.!-!!!-.-.!....!.-!-!...!!!")=="oui j ai sept chats ");
}


testerCodeMorse();