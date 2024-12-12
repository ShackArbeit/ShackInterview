// I write down two solution
// Here is solution one，use the built-in object constructor to remove duplicate elements from an array
function getUniqueNumber (items) { 
   return [...new Set(items)]
}

// Here is solution two,use the helper array and forEach method to ensures that the order of the results is the same as the original array.
function getUniqueNumber2(items){
    const uniqueArray = []
    items.forEach(item=>{
         if(!uniqueArray.includes(item)){
              uniqueArray.push(item)
         }
    })
    return uniqueArray
}

let Testitems = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 
    3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1]; 

console.log(getUniqueNumber(Testitems))
console.log(getUniqueNumber2(Testitems))