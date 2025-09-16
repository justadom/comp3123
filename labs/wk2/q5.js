var array = [1, 2, 3, 4];

const calculateSum = array.reduce((acc, curr) => acc + curr, 0);


const calculateProduct = array.reduce((acc, curr) => acc * curr, 1);

console.log(calculateSum);     
console.log(calculateProduct); 
