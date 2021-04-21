class vec {
  
    constructor (x,y){
      this.x=x;
      this.y=y;
    }
    
    minus = (v) => {
      return new vec(this.x-v.x,this.y-v.y);
    }
    
    plus = (v) => {
      return new vec(this.x+v.x,this.y+v.y);
    }
    
    get len () {
      return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    
  }
  
  let vettore = new vec(5,4);
  let vettore2 = new vec(3,2);
  
  console.log(vettore);
  console.log(vettore.minus(vettore2));
  console.log(vettore.plus(vettore2));

  console.log(vettore.len);