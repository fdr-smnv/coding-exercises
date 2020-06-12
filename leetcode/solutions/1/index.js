/*
    | 1 | Two Sum | Easy |

    Description:

    Given an array of integers, return indices of the two numbers such that they add up to a specific target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.

    Solution:

    Answer is to iterate over all number and find indices of values that sum up to the target value.

 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; ++i) {
        for(let k = i + 1; k < nums.length; ++k) {
            if (nums[i] + nums[k] === target) return [i, k];
        }
    }
};
