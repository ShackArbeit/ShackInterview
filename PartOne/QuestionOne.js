// ExampleArray=[{firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx', 
// profession: ‘xxx’} ]
function sortUserName(users){  
    // Determine whether it is a legally defined professional name
    const vaildProfession=['student', 'freelancer', 'productOwner', 'engineer', 'systemAnalytics']
    const vaildUser=users.filter(user=>vaildProfession.includes(user.profession))
    // Here mean do not include any legally defined professional name
    if(vaildUser.length===0){
          console.log('Do not include vaild profession')
          return []
    }
    return users.sort((a,b)=>{
         // Here with toLowerCase is due to JavaScript orginial sort by  UTF-16 , it does matter with Lower or Upper 
         const indexA=(a.firstName+a.lastName+a.customerID).toLowerCase();
         const indexB=(b.firstName+b.lastName+b.customerID).toLowerCase();
         // if indexA < indexB , it mean indexA-indexB < 0 ; indexA comes before IndexB.
         if(indexA<indexB) return -1;
         // if indexA > indexB , it mean indexA-indexB > 0 ; indexB comes before IndexA.
         if(indexA>indexB) return 1;
         // else the relative positions remain unchanged 
         return 0
    })
}
// const user=[
//     { firstName: 'Alice', lastName: '', customerID: '123', note: '', profession: 'student' },
//     { firstName: 'Bob', lastName: 'Smith', customerID: '122', note: 'test', profession: 'engineer' },
//     { firstName: 'Charlie', lastName: 'Brown', customerID: '124', note: '', profession: 'freelancer' },
// ]
console.log(sortUserName(user))