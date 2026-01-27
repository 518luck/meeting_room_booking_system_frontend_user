function twoSum(nums: number[], target: number): number[] {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const j = target - nums[i]; //这个减去的值就是我们需要的值
    if (map.has(j)) {
      console.log('i', i, map.get(j));
    }
    map.set(nums[i], i); //目前这个键值对中有是答案其中的一个值和下标
  }
}

const nums = [3, 2, 4],
  target = 6;

console.log(twoSum(nums, target));
