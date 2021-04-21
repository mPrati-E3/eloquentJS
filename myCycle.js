const v = [1,2,3,-4,5,6,-7,8,9];

function myCicle (valore, verifica, aggiornamento, corpo){
  
  let r = [];
  
  
  for (let i=0; i<valore.length; i=aggiornamento(i)){
    if (verifica(valore[i]))
      r.push(corpo(valore[i]));
  }

  
  return r;

}

console.log(myCicle(    v, 
                        (i) => i>0, 
                        (i) => {return i+1}, 
                        (i) => i+10));