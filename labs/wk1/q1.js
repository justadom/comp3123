function cap(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }
  
  console.log(cap("this is question 1"));
  