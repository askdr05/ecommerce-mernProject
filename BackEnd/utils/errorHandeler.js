class ErrorHandeler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.costructor)
    }
}
// e1 = new ErrorHandeler('ddv',2)

// console.log(e1.statusCode)
module.exports = ErrorHandeler