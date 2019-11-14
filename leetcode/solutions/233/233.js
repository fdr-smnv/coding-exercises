/*
  | 233 | Number of Digit One | Hard |

  Problem description:
    Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.
  
  Explanation of my implementation:
    Brute force solution of counting all appearing 1 digits in range will give us time exceeded error. But anyway I implemented it in function bruteCountDigitOne(n) just to use it as test for my other solution.
    
    First of all I noticed that from 0 to 99 there can only be 20 ones in that range. But if hundreds or thousands of n will have ones then there will be additional 100 ones times count of ones in hundreds and thousands. Thd is to iterate (or use recursion) from n to 0 and count all ones in the process. I decided to split main logic in two helper functions. OnesInHundred(n) counts and returns all 1 digits in first hundred. If n <= 0 it returns 0. Other function is OnesInMultOfHundIterative(n). It removes tens and ones from n and iterates with step -100 until n <= 99. At every step it adds to the count 20 and 100 * countOnes ( number of ones in hunds, thous, mils etc. ) after iteration is done returns count. And if n <= 99 then it returns 0. Main function just returns added results of helper functoins. Also there is OnesInMultOfHund function it uses recursion aaaand gives call stack exceeded error if n is too large (approx. if n > 10^7).

    Overall results from leetcode are:
      Runtime: 7088 ms, faster than 6.82% of JavaScript online submissions for Number of Digit One.
      Memory Usage: 92.1 MB, less than 100.00% of JavaScript online submissions for Number of Digit One.
    
    Room for improvement: 
      - use more constants to improve runtime
      - with more constants try to use recursion
    
    I'll checkout other solutions and try to implement the best one
  
 */

const OnesInMultOfHund = function (n) {
  n -= 100;
  if (n <= 99) return 20;

  const countOnes = (Math.floor(n / 100).toString().match(/1/g) || []).length;

  return (100 * countOnes + 20) + OnesInMultOfHund(n);
}

const OnesInMultOfHundIterative = function (n) {
  if (n <= 99) return 0;

  let count = 0;

  n = Math.floor(n / 100) * 100 - 100;

  while (n >= 0) {
    if (n <= 99) {
      count += 20;
      break;
    }
    const countOnes = (Math.floor(n / 100).toString().match(/1/g) || []).length;

    count += (100 * countOnes + 20);
    n -= 100;
  }
  return count;
}

const OnesInHundred = function (n) {
  if (n <= 0) return 0;

  const countOnes = (Math.floor(n / 100).toString().match(/1/g) || []).length;


  const ones = { 1: 1, 10: 2, 11: 4, 12: 5, 13: 6, 14: 7, 15: 8, 16: 9, 17: 10, 18: 11, 19: 12, 21: 13, 31: 14, 41: 15, 51: 16, 61: 17, 71: 18, 81: 19, 91: 20 }

  const tensones = n - (Math.floor(n / 100) * 100);
  const onesKeys = Object.keys(ones);

  if (tensones == 0) return countOnes

  for (let i = onesKeys.length; i >= 0; i--) {
    if (tensones >= onesKeys[i]) return (countOnes * (tensones + 1) + ones[onesKeys[i]]);
  }
}

var countDigitOne = function (n) {
  return OnesInHundred(n) + OnesInMultOfHundIterative(n)
};

const bruteCountDigitOne = function (n) {
  let count = 0;

  while (n >= 0) {
    count += (n.toString().match(/1/g) || []).length;
    n--;
  }

  return count;
}