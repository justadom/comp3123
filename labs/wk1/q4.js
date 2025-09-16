function angler(num){
    if (num > 0 && num < 90) {
        return("Acute angle");
    } else if (num == 90) {
        return ("right angle")
    } else if (num > 90 && num < 180){
        return ("obtuse angle")
    } else if (num == 180) {
        return ("stright angle")
    }
        

}

console.log(angler(1))
console.log(angler(90))
console.log(angler(91))
console.log(angler(180))