const v = [1,2,3,4,5,6,7,8,9];

function myEvery(vettore, funz){

    return (!vettore.some(funz));

}

console.log(myEvery(v, (l) => {
    if (l<0){
        return true;
    } else {
        return false;
    }
}));