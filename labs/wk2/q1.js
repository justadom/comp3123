const greeter = (myArray, counter) => {
  const greetText = 'Hello. ';
  for (let i = 0; i < counter; i++) {
    for (const name of myArray) {
      console.log(`${greetText}${name}`);
    }
  }
};

greeter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'], 3);
