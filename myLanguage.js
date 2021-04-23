function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) {
        expr = {type: "value", value: match[1]};
    } else if (match = /^\d+\b/.exec(program)) {
        expr = {type: "value", value: Number(match[0])};
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = {type: "word", name: match[0]};
    } else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }
    return parseApply(expr, program.slice(match[0].length));
}

/*Commenti
Sarebbe bello poter scrivere dei commenti in Egg. Per esempio, quando incontriamo un segno #
potremmo trattare il resto della riga come un commento e ignorarlo, come facciamo con // in
JavaScript.
Non servono grandi modifiche al parser per ottenere questo risultato. Basta modificare
skipSpace in modo che salti i commenti come se fossero spazio vuoto, in modo che tutte le
posizioni dove si richiama skipSpace saltino anche i commenti. Modificate il parser con questo
obiettivo.*/


function skipSpace(string) {

    let first = string.search(/[^\s]/);

    let stringaRitornata = string.slice(first);

    let second = stringaRitornata.search(/[^\#]/);

    let stringaRitornata2 = stringaRitornata.slice(second);

    if (first == -1 || second == -1) return "";

    return stringaRitornata2;
}

function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != "(") {
        return {expr: expr, rest: program};
    }
    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr, args: []};
    while (program[0] != ")") {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",") {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
}

function parse(program) {
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}

console.log(parse("+(a, 10)"));

// {
//      type: "apply",
//      operator: {type: "word", name: "+"},
//      args: [{type: "word", name: "a"},{type: "value", value: 10}]
//  }

const specialForms = Object.create(null);

function evaluate(expr, scope) {
    if (expr.type == "value") {
        return expr.value;
    } else if (expr.type == "word") {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError('Undefined binding: ${expr.name}');
        }
    } else if (expr.type == "apply") {
        let {operator, args} = expr;
        if (operator.type == "word" && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op = evaluate(operator, scope);
            if (typeof op == "function") {
                return op(...args.map(arg => evaluate(arg, scope)));
            } else {
                throw new TypeError("Applying a non-function.");
            }
        }
    }
}

specialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError("Wrong number of args to if");
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
};

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError("Wrong number of args to while");
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }
    // Poiché undefined non esiste, restituiamo false,
    // per la mancanza di un risultato che abbia un senso.
    return false;
};

specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

specialForms.set = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of set");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

/*Sistemare l’ambito di visibilità
Attualmente, l’unico modo per assegnare un valore a una variabile è define. Questo costrutto
consente sia di definire nuove variabili, sia di assegnare un valore a quelle esistenti.
Quest’ambiguità crea un problema. Quando cercate di assegnare un nuovo valore a una
variabile non locale, finite col definirne invece una locale con lo stesso nome. Alcuni linguaggi
funzionano così per definizione, ma mi sembra proprio un modo sciocco di gestire l’ambito di
visibilità.
Aggiungete un modello speciale set, simile a define, che assegni un nuovo valore a una
variabile, aggiornandola in un ambito esterno se già non esiste in quello interno. Se la variabile
non è stata definita, fate in modo che venga lanciato un errore ReferenceError (che è un altro tipo
di errore standard).
La tecnica di rappresentare gli ambiti di visibilità come semplici oggetti, che ci è tornata
tanto comoda finora, a questo punto vi darà un po’ fastidio. Potete provare a usare la funzione
Object.getPrototypeOf, che restituisce il prototipo di un oggetto. Ricordatevi inoltre che, dal
momento che gli ambiti di visibilità non derivano da Object.prototype, se volete richiamare su di
essi hasOwnProperty dovrete usare la seguente espressione:
Object.prototype.hasOwnProperty.call(scope, name);*/

const topScope = Object.create(null);
topScope.true = true;
topScope.false = false;

let prog = parse('if(true, false, true)');
console.log(evaluate(prog, topScope));
// → false

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = value => {
    console.log(value);
    return value;
};

function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}

run(`
    do(define(total, 0),   
    define(count, 1),
    while(<(count, 11),
    do(define(total, +(total, count)),
    define(count, +(count, 1)))),
    print(total))
`);
// 55

specialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type != "word") {
            throw new SyntaxError("Parameter names must be words");
        }
        return expr.name;
    });

    return function() {
        if (arguments.length != params.length) {
            throw new TypeError("Wrong number of arguments");
        }
        let localScope = Object.create(scope);
        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }
        return evaluate(body, localScope);
    };
};

run(`
do(define(plusOne, fun(a, +(a, 1))),
print(plusOne(10)))
`);
// 11

run(`
do(define(pow, fun(base, exp,
if(==(exp, 0),
1,
*(base, pow(base, -(exp, 1)))))),
print(pow(2, 10)))
`);
// 1024

run(`
do(define(f, fun(a, fun(b, +(a, b)))),
print(f(4)(5)))
`);
// → 9

/*Array
Aggiungete il supporto per gli array a Egg, aggiungendo le seguenti tre funzioni all’ambito
superiore: array(...values) per costruire un array contenente i valori degli argomenti,
length(array) per recuperare la lunghezza di un array ed element(array, n) per recuperare
l’elemento in posizione n. */


    

    
    
    
    
    
    
    