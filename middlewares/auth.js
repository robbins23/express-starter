var jwt = require('jwt-simple');
var secret = process.env.JWT_SECRET;
/*
 * call other imported services, or same service but different functions here if you need to
*/
const checkAuthToken = async (req, res, next) => {
    // check header or url parameters or post parameters for token
    const nonSecurePaths = ['/user/login', '/user/register', ];
    if (nonSecurePaths.includes(req.path)) return next();
    if(req.path.substring(1,7) == "public" || req.path.substring(1,7) == "upload")return next();
    var token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'];
    // decode token
    try{
        if (token && token.split(" ").length == 2 && token.split(" ")[1]) {
          // verifies secret and checks exp
          token = token.split(" ")[1]
          var decoded = jwt.decode(token, secret);
            console.log(decoded); //=> { foo: 'bar' }
            if(!decoded){
                return res.sendStatus(403);
            }else{
                req.user = decoded;
                next();
            }
        } else {
            req.errorMessage = 'No Token Provided!';
              return res.sendStatus(403);
        }
    }catch{
      return res.sendStatus(403);
    }
}


module.exports = {
  checkAuthToken
}