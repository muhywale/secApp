//const { sep } = require("path");

 let sep = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

console.log(sep(144009770));
console.log(sep(10008880.23));
console.log(sep(100004433560));

//sep(9000.00);