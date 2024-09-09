function calculate() {
    const expression = document.getElementById('expression').value;
    
    let result = process_expr(expression);
    
    document.getElementById('result').textContent = result;
}

function process_expr(expr) {

    const regex = /(\d+|\+|\-|\*|\/|\(|\))/g;
    const tokens = expr.match(regex);

    let simp_expre = [];

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '/') {

            let numer = parseInt(tokens[i - 1]);
            let denom = parseInt(tokens[i + 1]);

            let simp_frac = simplifyFraction(numer, denom);

            simp_expre.pop();
            simp_expre.push(simp_frac);
            
            i++;
        } else {
            simp_expre.push(tokens[i]);
        }
    }
    return simp_expre.join(' ');
}

function simplifyFraction(numer, denom) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    let divisor = gcd(numer, denom);

    numer /= divisor;
    denom /= divisor;

    if (denom === 1) {
        return numer;
    }
    return `${numer}/${denom}`;
}
