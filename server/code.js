//Initialize test values here 
 let test = "hello world";
let solution = function(test) {
        // test is a string. Count the number of vowels and return it
        /* Write your solution below this line */
        let count = 0;
        const vowels = 'aeiouAEIOU';
        for (let char of test) {
          if (vowels.includes(char)) {
            count++;
          }
        }
        return count;
        /* Write your solution above this line */
      }
      console.log(`Number of vowels in string [${test}] is ${solution(test)}.`);