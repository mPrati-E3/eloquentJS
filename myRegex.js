const a = "w ferrari ferretcar e cat idgae prop ious ErTeerEr .,; ee vious,.: .,: ferry op ious opop g";

//1 car e cat
console.log(/.*ca[r,t].*ca[r,t].*/.test(a));

//2 pop e prop
console.log(/.*p(r*)op.*p(r*)op.*/.test(a));

//3 ferret, ferry e ferrari
console.log(/.*ferr(et|y|ari).*ferr(et|y|ari).*ferr(et|y|ari).*/.test(a));

//4 Tutte le parole che finiscono con ious
console.log(a.match(/ious/g).length);

//5 Un carattere spazio vuoto seguito da un punto, una virgola, un punto e virgola o due punti
console.log(/.*\s\.\,[:,;].*/.test(a));

//5 Una parola di più di sei lettere
console.log(/.*\s([a-zA-Z]){7,}\s.*/.test(a));

//6 Una parola senza la lettera e
console.log(/.*\s([a-df-zA-Z]){1,}\s.*/.test(a));

/*Stile delle citazioni
Immaginate di aver scritto una storia usando le virgolette semplici per contrassegnare i brani di
dialogo. Ora volete sostituire tutte le virgolette semplici con virgolette doppie, mentre le
virgolette semplici usate in altre parti della storia (per esempio, gli apostrofi) vanno lasciate
come sono.
Provate a descrivere il pattern che distingue tra questi due tipi di virgolette e impostate una
chiamata al metodo replace che effettui le sostituzioni correttamente.*/

let story = "Ciao ma quanto sei 'bello', no l'ho sei t'u, no 'davvero', si'no";

const newR = /(\s\'([a-zA-Z]){1,}\'\,|\s\'([a-zA-Z]){1,}\'\s)/g;

let n;
while ((n = newR.exec(story)) != null) {
    let box = n[0].replace(/\'/g,"\"");
    story = story.replace(n[0], box);
}

console.log(story);

/*Ancora numeri
Scrivete un’espressione che trovi solo i numeri espressi in stile JavaScript. Dovete prevedere la
possibilità di avere un segno più o meno davanti al numero, il punto decimale e la notazione
dell’esponente, 5e-3 o 1E10, anche in questo caso con o senza un segno davanti all’esponente.
Notate che non è obbligatorio che ci siano cifre davanti o dopo il punto, ma il punto non può
essere da solo. In altre parole, .5 e 5. sono numeri validi in JavaScript, ma un punto solitario non
lo è. */

/*
const tantiNumeri = "DEGFVse . .f, 45,6 56.4 4. rg g 56.6 h.78 5e-3 6e-23sgg 1E10 . . .67";

const rg = /(\d+\.\d+|\d+\.|\.\d+|\d+e-\d+|\d+E\d+|\d+)/g;

let m;
while ((m = rg.exec(tantiNumeri)) != null) {
    console.log(m[0]);
}
*/