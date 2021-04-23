class Mountain {

    constructor (n,h,p){
        this.name=n;
        this.height=h;
        this.place=p;
    }
}

let mountains = [];

mountains.push(new Mountain("Montone",1800,"Geruvia"));
mountains.push(new Mountain("Montino",180,"Geruvia"));
mountains.push(new Mountain("Gran Colle",3000,"Pippolandia"));
mountains.push(new Mountain("Sasso",3,"Roccia"));
mountains.push(new Mountain("A MONTE!",1800000,"Qui"));
mountains.push(new Mountain("Frasasso",2000,"Fino"));
mountains.push(new Mountain("Largio",1600,"Fino"));
mountains.push(new Mountain("Pargio",1700,"Fino"));
mountains.push(new Mountain("Cargio",1800,"Fino"));
mountains.push(new Mountain("Montissimo",3000,"Geruvia"));

console.log(mountains);

let keyNames = Object.keys(mountains[0]);

console.log(keyNames);

h1.insertAdjacentHTML('afterend',
                        `<table id="tabella-montagne">
                            <tr id="table-headers">
                                <th id="nome"></th>
                                <th id="altezza"></th>
                                <th id="posto"></th>
                            </tr>  
                        </table>`)

let headerNome = document.getElementById("nome");
headerNome.insertAdjacentHTML('afterbegin',keyNames[0].toUpperCase());

let headerAltezza = document.getElementById("altezza");
headerAltezza.insertAdjacentHTML('afterbegin',keyNames[1].toUpperCase());

let headerPlace = document.getElementById("posto");
headerPlace.insertAdjacentHTML('afterbegin',keyNames[2].toUpperCase());

let headerTotal = document.getElementById("table-headers");
for (let el of mountains){
    headerTotal.insertAdjacentHTML("afterend",
                                        `<tr>
                                            <td>${el.name}<td>
                                            <td style="text-align: right">${el.height}<td>
                                            <td>${el.place}<td>
                                        <tr>`)
}





