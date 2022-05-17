const jwt = require('jsonwebtoken')
const { models } = require('mongoose');

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{
      expiresIn: '30m'
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{
      expiresIn: '30d'
    })
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, accessToken){
    const tokenData = await models.Token.findOne({user: userId})
    if(tokenData){
      tokenData.accessToken = accessToken
      return tokenData.save()
    }
    const token = await models.Token.create({user: userId, accessToken})
    return token
  }

}

module.exports = new TokenService()