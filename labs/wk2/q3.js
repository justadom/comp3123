const capitalize = ([first, ...rest]) => 
  first.toUpperCase() + rest.join('').toLowerCase();

const colors = ['red', 'green', 'blue'];

const capitalizedColors = colors.map(color => capitalize(color));

console.log(capitalizedColors);
