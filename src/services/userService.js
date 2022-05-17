const { models } = require('mongoose')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const UserDto = require("../dtos/userDTO");

class UserService {
  async registration(password, phone, name, surname, age){
    const candidate = await models.User.findOne({phone})
    if(candidate){
      throw new Error(`Пользователь с телефоном ${phone} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password,3)
    const user = await models.User.create({ password:hashPassword, is: {enabled: true}, name, surname, phone, age })

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id,tokens.accessToken)

    return { ...tokens, user: userDto }
  }

  async login(phone, password) {
    const candidate = await models.User.findOne({ phone })
    if (!candidate) {
      throw new Error(`Нет пользователя с телефоном ${phone}`)
    }

    const isPassEq = await bcrypt.compare(password, candidate.password);
    if (isPassEq) {
      const token = models.Token.findOne({ user: candidate._id })
      if (!token) {
        const userDto = new UserDto(candidate)
        const tokens = tokenService.generateToken({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.accessToken)
        return tokens
      }
      return token
    } else {
      throw new Error(`Неправильный пароль`)
    }
  }

  async getUsers() {
    const users = await models.User.find();
    return await Promise.all(users.map(async(user) => {
      if (user.organization) {
        user.organization = await models.Organization.findById(user.organization);
      }
      return user
    }));
  }

  async addUser(req) {
    const {
      phone,
      password,
      name,
      age,
      position,
      organization,
      admin,
    } = req;
    const checkUser = await models.User.findOne({phone});
    const hashPassword = await bcrypt.hash(password,3)
    if (checkUser || !password) {
      throw new Error(`Пользователь с таким телефоном уже существует или не указан пароль`)
    }
    return models.User.create({
      phone,
      password: hashPassword,
      name,
      age,
      position,
      organization,
      admin,
      is: {
        enabled: true
      }
    })
  }

  async updateUser(body) {
    if (body?.password) {
      body.password = await bcrypt.hash(body.password,3)
    }
    if (!body?.id) {
      throw new Error(`Пользователь не найден`)
    }
    return models.User.findByIdAndUpdate(body.id, body)
  }

  async deleteUser(body) {
    const {id} = body;
    if (!id) {
      throw new Error(`no users id`)
    }
    return await models.User.findByIdAndDelete(id);
  }

  async getUser(id) {
    const user = await models.User.findById(id);
    if (user.organization) {
      user.organization = await models.Organization.findById(user.organization);
    }
    return user
  }

  async getUserByToken(accessToken){
    const tokenData = await models.Token.findOne({accessToken})
    if (tokenData){
      console.log(tokenData);
      return models.User.findById(tokenData.user);
    }else {
      throw new Error(`token not found!`)
    }
  }

}

module.exports = new UserService()