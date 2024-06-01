export function deepEqualArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((obj1, index) => {
      const obj2 = arr2[index];
      return obj1.option === obj2.option && obj1.isCorrect === obj2.isCorrect;
    });
  }