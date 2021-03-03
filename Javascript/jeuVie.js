/* Rémi Campagnie 0983980 */


/* dessine un carré de côté "h" */
function square(h){
    pd();
    for(var i=0 ; i<4 ; i++){
        fd(h);
        rt(90);
    }
}


/* efface l'écran et dessine la grille de jeu vide et place la tortue au milieux de la première case
   dim x dim , h px/case */
function grille(dim,h){
    cs();
    pu();
    fd(-dim*h/2);
    rt(90);
    fd(-dim*h/2);
    rt(-90);
    pd();
    for(var i=0 ; i<dim ; i++){
        for(var j=0 ; j<dim ; j++){
            square(h);
            fd(h);
        }
        rt(90);
        fd(h);
        rt(-90);
        fd(-dim*h);
    }
    pu();
    fd((dim-1)*h);
    rt(-90);
    fd((dim-0.5)*h);
    rt(90);
    pd();
}


/* permet de choisir le pourcentage approximatif de cellules vivantes en entrant un chiffre entre 1 et 99. */
function menu(){
    var percent = 0;
    while(isNaN(percent) || percent<1 || percent >99){
        percent = prompt("Entrer le pourcentage approximatif de cellules vivantes en entrant un chiffre entre 1 et 99:");
    }
    return percent;
}


/* retourne la grille (dim x dim) de jeu initial */
function grilleInit(dim){
    var grilleTemp = Array(dim*dim).fill(0); //array seuleument avec des cellules mortes
    var percent = menu();
    var nbCel = Math.round(percent/100*dim*dim); //nombre de cellules vivantes a placer
    //rempli la grille avec les cellules vivantes
    var n=0;
    while(n<nbCel){
        var newCelPos=Math.floor(Math.random()*dim*dim);
        if(grilleTemp[newCelPos]==0){
            grilleTemp[newCelPos]=1;
            n++;
        }
    }
    //transforme la grille en 2-D array
    var grille = new Array(dim);
    for(var i=0 ; i<dim ; i++){grille[i]=new Array(dim);}
    for(var i=0 ; i<dim ; i++){
        for(var j=0 ; j<dim ; j++){
            grille[i][j]=grilleTemp.shift();
        }
    }
    return grille;
}


/* rempli une case d'une couleur rouge. h:largeur des cases en pixels */
function fill(h){
    pu();
    fd(1);
    pd();
    setpc(1,0,0);//rouge => cellule vivante
    setpw(h-2);
    fd(h-2);
    pu();
    fd(-h+1);
    pd();
}


/* dessine sur la grille les cellules vivantes à partir d'un 2-D array (tableJeu)
   qui contient des 0 (cellule morte) et des 1 (cellule vivante). case rouge => cellule vivante.
   h:largeur des cases en pixels*/
function draw(tableJeu,h){
    var dim = tableJeu[0].length;
    for(var i=0 ; i<dim ; i++){
        for(var j=0 ; j<dim ; j++){
            if(tableJeu[i][j] == 1){fill(h);}
            pu();
            rt(90);
            fd(h);
            rt(-90);
            pd();
        }
        pu();
        fd(-h);
        rt(-90);
        fd(dim*h);
        rt(90);
        pd();
    }
    ht();
}


/* applique les règles du jeu de la vie à chaque case de la grille (dim x dim).
   • Une cellule qui a moins de deux voisins vivants à une étape sera morte à la prochaine
     étape (sous-population);
   • Une cellule qui a deux ou trois voisins vivants continuera de vivre à la prochaine étape;
   • Une cellule qui a plus de trois voisins vivants sera morte à la prochaine étape
     (surpopulation);
   • Une cellule morte qui a exactement trois voisins vivants “naîtra” à l’étape suivante et sera
     donc vivante (reproduction);*/
function play(tableJeu){
    var dim=tableJeu.length;
    var tableTemp = new Array(dim+2); //tableTemp est tableJeu avec une bordure de 0(cellules mortes)
                                      //on l'utilise pour ne pas être "out of bound" dans l'étape suivante
    for(var i=0 ; i<dim+2 ; i++){tableTemp[i] = new Array(dim+2);}
    for(var i=0 ; i<dim+2 ; i++){
        for(var j=0 ; j<dim+2 ; j++){
            if(i==0 || i==dim+1 || j==0 || j==dim+1){tableTemp[i][j]=0;}
            else{tableTemp[i][j]=tableJeu[i-1][j-1];}
        }
    }
    var nextTable = new Array(dim); //la table de l'étape suivante
    for(var i=0 ; i<dim ; i++){nextTable[i] = new Array(dim);}
    for(var i=0 ; i<dim ; i++){
        for(var j=0 ; j<dim ; j++){
            nextTable[i][j]=0;
        }
    }
    
    for(var i=1 ; i<dim+1 ; i++){
        for(var j=1 ; j<dim+1 ; j++){
            var cellAlive = tableTemp[i-1][j-1]+tableTemp[i-1][j]+tableTemp[i-1][j+1]
            				+tableTemp[i][j-1]+tableTemp[i][j+1]
            				+tableTemp[i+1][j-1]+tableTemp[i+1][j]+tableTemp[i+1][j+1];
            switch(tableTemp[i][j]){
                case 0: //règle pour qu'une cellule morte devienne vivante
                    if(cellAlive==3){nextTable[i-1][j-1]=1;}
                    break;
                case 1: //règle pour qu'une cellule vivante reste vivante
                    if(cellAlive>=2 && cellAlive<=3){nextTable[i-1][j-1]=1;}
                    break;
            }
        }
    }
    return nextTable;
}


/* test les 4 règles du jeu */
function testPlay(){
    //pour la cellule au centre de la grille:
    //• Une cellule qui a moins de deux voisins vivants à une étape sera morte à la prochaine étape (sous-population)
    assert(play([[0,0,0],[0,1,1],[0,0,0]])[1][1]==0);
    //• Une cellule qui a deux ou trois voisins vivants continuera de vivre à la prochaine étape
    assert(play([[0,1,0],[0,1,0],[1,0,0]])[1][1]==1);
    //• Une cellule qui a plus de trois voisins vivants sera morte à la prochaine étape (surpopulation)
    assert(play([[1,0,1],[1,1,0],[0,1,0]])[1][1]==0);
    //• Une cellule morte qui a exactement trois voisins vivants “naîtra” à l’étape suivante et sera donc vivante(reproduction)
    assert(play([[0,0,0],[0,0,1],[0,1,1]])[1][1]==1);
}


/* la fonction principale qui fait l'animation */
function main(){
    var dim=20, h=10 , delay=0.1;//dim:dimension de la grille | h:hauteur en pixels des cases | delay:pause en sec / image
                                 //remarque: on ne peut que faire des grille carré
    grille(dim,h);
    var table = grilleInit(dim);
    draw(table,h);
    print("Étape 0");
    pause(delay);
    var nbIte=1; //compte le nombre d'itérations
    while(true){
        table=play(table);
        grille(dim,h);
        draw(table,h);
        print("Étape "+(nbIte++));
        pause(delay);
    }
}


main();