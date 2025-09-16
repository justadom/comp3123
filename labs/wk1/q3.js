function mover(str) {
    if (str.length < 3) return str;
    return str.substring(str.length - 3) + str.substring(0, str.length - 3);
  }
  
  console.log(mover("java"));
  console.log(mover("ja"));
