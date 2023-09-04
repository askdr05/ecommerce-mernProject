class ApiFeatures{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }

    search() {
      const keyword = this.queryStr.keyword
    
       ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
            
          }
        
        : {};
       

        this.query = this.query.find({...keyword })
        // console.log(keyword)
      return this
    }

    searchByCategory() {
      const category = this.queryStr.category?{
        category: {
          $regex: this.queryStr.category,
          $options: "i",
        },
        
      }:{};

        this.query =this.query.find({...category })
        // console.log(keyword)
      return this
    }

    filter(){
        const queryCopy = {...this.queryStr}
        // console.log(queryCopy)
        // removing some fields for category
        const removeFields = ["keyword","page","limit",'category']
         
        removeFields.forEach((e)=> delete queryCopy[e])

        // pricr filtering
        console.log(queryCopy)

        let querystr = JSON.stringify(queryCopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (e)=> `$${e}`)

        console.log(querystr)

        this.query = this.query.find(JSON.parse(querystr))

        return this

    }


     pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)||1

        const skip = resultPerPage * (currentPage-1)


        this.query = this.query.limit(resultPerPage).skip(skip)

        return this

     }    
    
}

module.exports = ApiFeatures

