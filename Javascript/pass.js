var valide=false;

while(valide==false){
	var mot = prompt("Entrer votre mot de passe:");

	print("Mot de passe: "+mot);

	if (mot.length>=4 && mot.length<=8 //condition 1 : 4<=length(mdp)<=8
    	&& mot[0]!=mot[mot.length-1] //condition 2 : 1er char et 2eme char différent
    	&& mot.charCodeAt(0)>=65 && mot.charCodeAt(0)<=90
    	|| mot.charCodeAt(0)>=97 && mot.charCodeAt(0)<=122  //condition 3 : 1er char est une lettre (http://www.asciitable.com/)
    	&& mot.charCodeAt(1)<=47 
    	|| mot.charCodeAt(1)>=58 && mot.charCodeAt(1)<=64 
    	|| mot.charCodeAt(1)>=91 && mot.charCodeAt(1)<=96 
    	|| mot.charCodeAt(1)>=123) //condition 4 : 2eme char n'est pas alphanumérique (http://www.asciitable.com/)
	{valide=true;}
	else {valide=false;}

	if (valide==true){
    	var confirmation = prompt("Entrer votre mot de passe une deuxième fois:");
    	var identique = mot==confirmation;
    	if (identique == true){print("Vous avez bien configuré votre mot de passe !");}
    	else {print("Vous n'avez pas réécrit le même mot de passe");}
	}
	else{print("Votre mot de passe ne respecte pas les critères de sécurité");}
}