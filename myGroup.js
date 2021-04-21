class gruppo {
  
    constructor (){
      this.lista = [];
    }
    
    add = (el) => {
      let flag=false;  
      for (let i of this.lista){
          if (el === i){
            flag=true;
          }
      }
      if (!flag){
          this.lista.push(el);
      }
    }
    
    delete = (el) => {
      if (this.lista.indexOf(el)>=0) this.lista.splice(this.lista.indexOf(el),1);
    }

    has = (el) => {
        for (let i of this.lista){
            if (el === i){
                return true;
            }
        }
        return false;
    }

    
}

function Pgruppo (l){
  
  this.lista = l;
  
}

Pgruppo.empty = () => {
  return new Pgruppo([]);
}

Pgruppo.add = (pg,el) => {
  let newLista = [...pg.lista];
  let flag=false;  
  for (let i of newLista){
      if (el === i){
        flag=true;
      }
  }
  if (!flag){
      newLista.push(el);
  }
  return new Pgruppo(newLista);
}

Pgruppo.del = (pg,el) => {
  let newLista = [...pg.lista];
  if (newLista.indexOf(el)>=0) newLista.splice(newLista.indexOf(el),1);
  return new Pgruppo(newLista);
}


let G = Pgruppo.empty();
console.log(G.lista);
let G1=Pgruppo.add(G,"pippo");
let G2=Pgruppo.add(G1,"pluto");
let G3=Pgruppo.add(G2,"paperino");
let G4=Pgruppo.add(G3,"pippo");
let G5=Pgruppo.add(G4,"topolino");
console.log(G5.lista);
console.log(G1.lista);

let G6 = Pgruppo.del(G5,"topolino");
console.log(G6.lista);
