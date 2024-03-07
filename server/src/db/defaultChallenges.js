module.exports = [
    {
      user_id: '0',
      description: { short: 'Count vowels in a string', long: 'Write a function to count the number of vowels (a, e, i, o, u) in a given string.' },
      challenge_name: 'Count Vowels',
      boilerplate: `let solution = function(test) {
        // test is a string. Count the number of vowels and return it
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Number of vowels in string [\${test}] is \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
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
      console.log(\`Number of vowels in string [\${test}] is \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = "hello world";'],
      difficulty: 'Easy',
    },
    {
      user_id: '0',
      description: { short: 'Check if a number is prime', long: 'Write a function to check if a given number is a prime number.' },
      challenge_name: 'Prime Number Check',
      boilerplate: `let solution = function(test) {
        // test is a number. Check if it's prime and return true or false
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Is \${test} a prime number? \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
        // test is a number. Check if it's prime and return true or false
        /* Write your solution below this line */
        if (test <= 1) return false;
        if (test <= 3) return true;
        if (test % 2 === 0 || test % 3 === 0) return false;
        let i = 5;
        while (i * i <= test) {
          if (test % i === 0 || test % (i + 2) === 0) return false;
          i += 6;
        }
        return true;
        /* Write your solution above this line */
      }
      console.log(\`Is \${test} a prime number? \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = 17;'],
      difficulty: 'Medium',
    },
    {
      user_id: '0',
      description: { short: 'Find the factorial of a number', long: 'Write a function to calculate the factorial of a given number.' },
      challenge_name: 'Factorial',
      boilerplate: `let solution = function(test) {
        // test is a number. Calculate its factorial and return it
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Factorial of \${test} is \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
        // test is a number. Calculate its factorial and return it
        /* Write your solution below this line */
        if (test === 0 || test === 1) return 1;
        let result = 1;
        for (let i = 2; i <= test; i++) {
          result *= i;
        }
        return result;
        /* Write your solution above this line */
      }
      console.log(\`Factorial of \${test} is \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = 5;'],
      difficulty: 'Medium',
    },
    {
      user_id: '0',
      description: { short: 'Find the maximum element in an array', long: 'Write a function to find the largest element in a given array of numbers.' },
      challenge_name: 'Maximum Array Element',
      boilerplate: `let solution = function(test) {
        // test is an array. Find its maximum element and return it
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Maximum element in array [\${test}] is \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
        // test is an array. Find its maximum element and return it
        /* Write your solution below this line */
        if (test.length === 0) return null;
        let max = test[0];
        for (let i = 1; i < test.length; i++) {
          if (test[i] > max) {
            max = test[i];
          }
        }
        return max;
        /* Write your solution above this line */
      }
      console.log(\`Maximum element in array [\${test}] is \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = [3, 8, 2, 10, 5];'],
      difficulty: 'Easy',
    },
    {
      user_id: '0',
      description: { short: 'Check if a string is a palindrome', long: 'Write a function to determine if a given string is a palindrome (reads the same forwards and backwards).' },
      challenge_name: 'Palindrome Check',
      boilerplate: `let solution = function(test) {
        // test is a string. Check if it's a palindrome and return true or false
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Is \${test} a palindrome? \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
        // test is a string. Check if it's a palindrome and return true or false
        /* Write your solution below this line */
        let left = 0;
        let right = test.length - 1;
        while (left < right) {
          if (test[left] !== test[right]) {
            return false;
          }
          left++;
          right--;
        }
        return true;
        /* Write your solution above this line */
      }
      console.log(\`Is \${test} a palindrome? \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = "racecar";'],
      difficulty: 'Easy',
    },
    {
      user_id: '0',
      description: { short: 'Calculate the nth Fibonacci number', long: 'Write a function to calculate the nth Fibonacci number.' },
      challenge_name: 'Fibonacci Number',
      boilerplate: `let solution = function(test) {
        // test is a number. Calculate the nth Fibonacci number and return it
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Fibonacci number at index \${test} is \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
        // test is a number. Calculate the nth Fibonacci number and return it
        /* Write your solution below this line */
        if (test <= 1) return test;
        let fibPrev = 0;
        let fibCurr = 1;
        for (let i = 2; i <= test; i++) {
          let temp = fibCurr;
          fibCurr = fibPrev + fibCurr;
          fibPrev = temp;
        }
        return fibCurr;
        /* Write your solution above this line */
      }
      console.log(\`Fibonacci number at index \${test} is \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = 6;'],
      difficulty: 'Medium',
    },
    {
      user_id: '0',
      description: { short: 'Check if two strings are anagrams', long: 'Write a function to check if two given strings are anagrams of each other (contain the same characters in different order).' },
      challenge_name: 'Anagram Check',
      boilerplate: `let solution = function(test) {
        // test is an array containing two strings. Check if they are anagrams and return true or false
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Are \${test[0]} and \${test[1]} anagrams? \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
        // test is an array containing two strings. Check if they are anagrams and return true or false
        /* Write your solution below this line */
        const str1 = test[0].toLowerCase().split('').sort().join('');
        const str2 = test[1].toLowerCase().split('').sort().join('');
        return str1 === str2;
        /* Write your solution above this line */
      }
      console.log(\`Are \${test[0]} and \${test[1]} anagrams? \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = ["listen", "silent"];'],
      difficulty: 'Easy',
    },
    {
      user_id: '0',
      description: { short: 'Find the missing number in an array', long: 'Write a function to find the missing number in a given array of consecutive numbers from 1 to n, where one number is missing.' },
      challenge_name: 'Missing Number',
      boilerplate: `let solution = function(test) {
        // test is an array. Find the missing number and return it
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Missing number in array [\${test}] is \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
        // test is an array. Find the missing number and return it
        /* Write your solution below this line */
        const n = test.length + 1;
        const totalSum = (n * (n + 1)) / 2;
        const arraySum = test.reduce((acc, curr) => acc + curr, 0);
        return totalSum - arraySum;
        /* Write your solution above this line */
      }
      console.log(\`Missing number in array [\${test}] is \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = [1, 2, 4, 5, 6];'],
      difficulty: 'Medium',
    },
    {
      user_id: '0',
      description: { short: 'Find the longest word in a string', long: 'Write a function to find the longest word in a given string (assume words are separated by spaces).' },
      challenge_name: 'Longest Word',
      boilerplate: `let solution = function(test) {
        // test is a string. Find the longest word and return it
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Longest word in string [\${test}] is \${solution(test)}.\`);`,
      solution: `let solution = function(test) {
        // test is a string. Find the longest word and return it
        /* Write your solution below this line */
        const words = test.split(' ');
        let longestWord = '';
        for (let word of words) {
          if (word.length > longestWord.length) {
            longestWord = word;
          }
        }
        return longestWord;
        /* Write your solution above this line */
      }
      console.log(\`Longest word in string [\${test}] is \${solution(test)}.\`);`,
      test_values: ['//Initialize test values here \n let test = "The quick brown fox jumped over the lazy dog";'],
      difficulty: 'Easy',
    },
    {
      user_id: '0',
      description: { short: 'Remove duplicate elements from an array', long: 'Write a function to remove duplicate elements from a given array and return the new array without duplicates.' },
      challenge_name: 'Remove Duplicates',
      boilerplate: `let solution = function(test) {
        // test is an array. Remove duplicate elements and return the new array
        /* Write your solution below this line */
  
        /* Write your solution above this line */
      }
      console.log(\`Array after removing duplicates: [\${solution(test)}].\`);`,
      solution: `let solution = function(test) {
        // test is an array. Remove duplicate elements and return the new array
        /* Write your solution below this line */
        const uniqueArray = [];
        for (let element of test) {
          if (!uniqueArray.includes(element)) {
            uniqueArray.push(element);
          }
        }
        return uniqueArray;
        /* Write your solution above this line */
      }
      console.log(\`Array after removing duplicates: [\${solution(test)}].\`);`,
      test_values: ['//Initialize test values here \n let test = [1, 2, 2, 3, 4, 4, 5];'],
      difficulty: 'Easy',
    }
    // Add more challenges here...
  ];
  