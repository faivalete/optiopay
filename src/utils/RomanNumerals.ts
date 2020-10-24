
export const romanToIntegers = {
    I: 1,
    V: 5,
    X: 10, 
    L: 50,
    C: 100,
    D: 500, 
    M: 1000,   
};

type RomanDictionary = {
    [key: string]: number,
}

export const romanDictionary = {M:1000,CM:900, D:500,CD:400, C:100, XC:90,L:50, XV: 40, X:10, IX:9, V:5, IV:4, I:1} as RomanDictionary; 


export const isValidRoman = (roman: string) => {
    const values = roman.split('');
    return values.filter(val => val in romanToIntegers).length == values.length ;
}


class RomanNumerals {
    toRoman (integer: number): string {
        let division;
        let result = '';
        let rest = integer;

        Object.keys(romanDictionary)
            .map((key: string) => {
            division = Math.floor(rest / romanDictionary[key]);
            if(division >= 0) {
                for(let i = 0; i < division; i++){
                  result += key;
                }
              }
            rest = rest % romanDictionary[key];
            });

        return result;
    }

    fromRoman (roman: string): number {
        const romanLetters = Object.assign([], roman);
        
        const total = romanLetters.reduce(function (acc, val, idx) {
            
            if (idx + 1 == romanLetters.length) {
                return acc + romanToIntegers[val];
            }


            if (romanToIntegers[val] >= romanToIntegers[romanLetters[idx + 1]]) {
                return acc + romanToIntegers[val];
            } else {
                return romanToIntegers[romanLetters[idx + 1]] - acc;
            }
        }, 0);

        return total;
    }
}


const romanConverter = new RomanNumerals();

export default romanConverter