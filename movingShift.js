function movingShift(s, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        let isUpperCase = char === char.toUpperCase();
        let index = alphabet.indexOf(char.toLowerCase());
        
        if (index !== -1) {
            let newIndex = (index + shift + i) % alphabet.length;
            let encodedChar = alphabet[newIndex];
            result += isUpperCase ? encodedChar.toUpperCase() : encodedChar;
        } else {
            result += char;
        }
    }

    const partLength = Math.ceil(result.length / 5);
    let parts = [];
    for (let i = 0; i < 5; i++) {
        parts.push(result.slice(i * partLength, (i + 1) * partLength));
    }

    return parts;
}

const s = "I should have known that you would have a perfect answer for me!!!";
const shift = 1;
console.log(movingShift(s, shift));