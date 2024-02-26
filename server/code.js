//Initialize test values here 
 let test = [1,2,3,4,5];
let solution = function(test) {
        // test is an array. Find its sum and return it
        /* Write your solution below this line */
        let sum = 0;
        for (let item of test) {
          sum += item;
        }
        return sum;
        /* Write your solution above this line */
    }
    console.log(`Sum of array is ${solution(test)}.`);