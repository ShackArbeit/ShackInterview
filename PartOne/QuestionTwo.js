// (‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ > 
//     ‘student’’) 
function sortByType(users){
    const indexofProfession=['systemAnalytics','engineer','productOwner','freelancer','student']
    return users.sort((a,b)=>{
          const indexA=indexofProfession.indexOf(a.profession)
          const indexB=indexofProfession.indexOf(b.profession)
          // These steps skips the following process.
          // if(indexA<indexB) return -1; if(indexA>indexB) return 1; return 0
          return indexA-indexB
    })
}
const user=[
     { firstName: 'Alice', lastName: '', customerID: '123', note: '', profession: 'student' },
      { firstName: 'Bob', lastName: 'Smith', customerID: '122', note: 'test', profession: 'engineer' },
      { firstName: 'Charlie', lastName: 'Brown', customerID: '124', note: '', profession: 'freelancer' },
  ]
console.log(sortByType(user))