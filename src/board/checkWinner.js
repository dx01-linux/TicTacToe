//        Board
//      A  B  C
// 1
// 0
// 2
//run test over all horizontal pos
let testHorizontalPattern = (obj) => {
    //run test ower own horizontal pos
    let horizontal = (obj, pos) => {
        let hasValue = [];
        let hasPattern = 0;
        let getValue = ['a', 'b', 'c'].map(value => (value + pos));

        let counter = 0;
        let keys = Object.keys(obj);
        keys.forEach(key => {
            if (getValue[counter] == obj[key][pos]) {
                hasValue.push(true);
            } else {
                hasValue.push(false);
            }
            counter += 1;
        });

        hasValue.forEach(value => {
            if (value == true) {
                hasPattern += 1;
            }
        });

        if (hasPattern == 3) {
            return true;
        } else {
            return false;
        }
    }

    if (horizontal(obj, 0) == true || horizontal(obj, 1) == true || horizontal(obj, 2) == true) {
        return true;
    } else {
        return false;
    }
}
//run test over one vertical group
let testVerticalsPatterns = (obj) => {
    //test one vertical group
    let vertical = (obj, group) => {
        let hasValue = [];
        let hasPattern = false;
        let getValue = [0, 1, 2].map(value => (group.toLowerCase()) + value);

        let counter = 0;
        getValue.forEach(value => {
            if (value == obj[group][counter]) {
                hasValue.push(true);
            } else {
                hasValue.push(false);
            }
            counter += 1;
        });

        hasValue.forEach(value => {
            if (value == false) {
                hasPattern = false;
                return;
            }

            hasPattern = true;
        });
        return hasPattern;
    }

    if (vertical(obj, 'A') == true || vertical(obj, 'B') == true || vertical(obj, 'C') == true) {
        return true;
    } else {
        return false;
    }

}
// run test over the two cross patterns
let testCrossPatterns = (obj) => {
    // let crossA = ['a0' , 'b1' , 'c2'];
    let crossA = {
        A: 'a0',
        B: 'b1',
        C: 'c2',
    }
    let crossB = {
        A: 'a2',
        B: 'b1',
        C: 'c0',
    }

    //compare patter crossA & crossB against incoming Object
    let check = (obj, patt) => {
        let hasPattern = 0;
        let keys = Object.keys(obj);
        keys.forEach(key => {
            obj[key].forEach(value => {
                if (value == patt[key]) {
                    hasPattern += 1;
                }
            })
        })
        if (hasPattern == 3) {
            return true;
        } else {
            return false;
        }
    }

    if (check(obj, crossA) == true || check(obj, crossB) == true) {
        return true;
    } else {
        return false;
    }

}

let check = (obj) => {
    if (typeof (obj) == undefined) {
        console.log(`pattern can't be performed over an undefined object`);
    }
    else {
        if (testHorizontalPattern(obj) == true || testVerticalsPatterns(obj) == true || testCrossPatterns(obj) == true) {
            return true;
        } else {
            return false;
        }
    }
}

export { check }