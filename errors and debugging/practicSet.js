let area = 0;
function calculateArea(width,height){
  return area= (width*height);
}
let width = 10 ,height = 5;

if (area>100){
  console.log("The area is large");
}
else if(width+height>= 100){
  console.log("Area is greater than or equal to 100");
  
}
else{
  console.log("The area is small");
}

module.exports = calculateArea;