var dico = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]; //max base:36

function reverse(str)
{
    var splitString = str.split("");    // Step 1. Use the split() method to return a new array
    var reverseArray = splitString.reverse();    // Step 2. Use the reverse() method to reverse the new created array
    var joinArray = reverseArray.join("");    // Step 3. Use the join() method to join all elements of the array into a string
    return joinArray;    //Step 4. Return the reversed string
}

function changeBase(x, b1, b2)
{
    x = x.toUpperCase(x);
    b1 = parseInt(b1);
    b2 = parseInt(b2);
    //x_b1 to x_10
    var x_10=0;
    for (var i=0 ; i<x.length ; i++)
    {
        x_10+=Math.pow(b1,x.length-(i+1))*dico.indexOf(x[i]);
    }
    
    //x_10 to x_b2
    var x_b2=[];
    var indice=0;
    while (x_10!=0)
    {
        indice=x_10%b2;
        x_b2+=dico[indice];
        x_10=Math.floor(x_10/b2);
    }
     x_b2=reverse(x_b2);
    
    return x_b2;
}

var x = prompt("Enter your number:");
var b1 = prompt("Enter its base:");
// TO DO:put alert if base incompatible
var b2 = prompt("Enter new base:");

print(x.toUpperCase()," in base ",b1," is ",changeBase(x,b1,b2)," in base ",b2);