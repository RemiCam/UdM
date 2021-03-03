/* Rémi Campagnie 0983980 */


/* Dessine un triangle équilatéral de côté de longueur "cote" */
function triangleEq(cote){
    for(var i=0 ; i<=2 ; i++){
        fd(cote);
        rt(120);
    }
};


/* Dessine une pyramide de triangles équilatéraux ayant des côtés de longueur "cote" et une hauteur de "n" triangles */
function pyramide(cote,n){
    while(n !=0){
        for(var i=0 ; i<n ; i++){
            triangleEq(cote);
            fd(cote);
        }
        rt(120);
        fd(cote);
        rt(60);
        fd(--n*cote);
        rt(180);
    }
};


/* Trace un rectanlge de côté "dimX" et "dimY" */
function cage(dimX, dimY){
    pu();
    fd(dimY/2);
    rt(90);
    pd();
    fd(dimX/2);
    rt(90);
    fd(dimY);
    rt(90);
    fd(dimX);
    rt(90);
    fd(dimY);
    rt(90);
    fd(dimX/2);
    pu();
    rt(-90);
    fd(-dimY/2);
    pd();
}


/* Anime un déplacement d'une pyramide de côté 10 et de hauteur 5. 
   La pyramide doit rebondir lorsque le point de départ du tracé touche un des bords de l'écran */
function animation(debutX,debutY,vitesseX,vitesseY,vitesseAngulaire){
    var dimX = 300 , dimY = 200 ; //les dimensions en pixel de l'écran
    var delay = 0.01; // temp de pause entre chaque dessin
    //1ère pyramide
    cs();
    cage(dimX,dimY); //trace les contours de l'écran
    pu();
    fd(debutY);
    rt(90);
    fd(debutX);
    rt(-90);
    pd();
    pyramide(10,5);
    pause(delay);
    //animation
    var debutAngulaire = 0;
    while(true){
        cs();
        cage(dimX,dimY); //trace les contours de l'écran
        pu();
        if(debutY >= dimY/2 || debutY <= -dimY/2){vitesseY*=-1;}
        debutY+=vitesseY*delay;
        fd(debutY);
        rt(90);
        if(debutX >= dimX/2 || debutX <= -dimX/2){vitesseX*=-1;}
        debutX+=vitesseX*delay;
        fd(debutX);
        rt(-90);
        debutAngulaire+=vitesseAngulaire*delay;
        debutAngulaire%=360; //empèche debutAngulaire de dépasser intmax=2^63-1
        rt(debutAngulaire);
        pd();
        pyramide(10,5);
        pause(delay);
    }
};

animation(-15,-15,35,20,90);