const userService = require('../services/userService')
const httpResponse = require('../helpers/response');

class userController {

  async registration(req,res,next) {
    try {
      const { password, phone, name, surname, age } = req.body;
      const userData = await userService.registration(password, phone, name, surname, age);
      res.cookie('accessToken', userData.accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData);
    } catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

  async login(req,res,next) {
    try {
      const { phone, password } = req.body
      const token = await userService.login(phone, password);
      return httpResponse.ok(res, token);
    } catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

  async logout(req,res,next) {
    try {
      const {accessToken} = req.cookies;
      res.clearCookie('accessToken');
      return res.json(accessToken)
    }catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

  async getUsers(req,res,next) {
    try {
      const userData = await userService.getUsers();
      return res.json(userData);
    }catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

  async addUser(req, res) {
    try {
      const response = await userService.addUser(req.body);
      if (response?.status === 404 && response?.msg) {
        return httpResponse.notFound(res, response.msg);
      }
      if (response?.status === 400 && response?.msg) {
        return httpResponse.clientError(res, response.msg);
      }
      return httpResponse.ok(res, { result: 'User added' });
    } catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

  async updateUser(req, res) {
    try {
      const result = await userService.updateUser(req.body);
      if (result?.status === 400 && result?.msg) {
        return httpResponse.clientError(res, result.msg);
      }
      if (result?.status === 404 && result?.msg) {
        return httpResponse.notFound(res, result.msg);
      }
      if (result?.status === 404) {
        return httpResponse.notFound(res, "This user doesn't exist");
      }
      return httpResponse.ok(res, { result: 'User updated' });
    } catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

  async deleteUser (req, res) {
    try {
      await userService.deleteUser(req.body);
      return httpResponse.ok(res, { result: 'User deleted' });
    } catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

  async getUser (req, res) {
    const { user_id } = req.query;
    try {
      if (!user_id) {
        throw Error('getUser(), missed required param: user_id');
      }
      const response = await userService.getUser(user_id);
      return httpResponse.ok(res, response);
    } catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

  async getUserByToken (req, res) {
    let accessToken;
    if (req.cookies.accessToken) accessToken = req.cookies.accessToken;
    else if (req.headers.token) accessToken = req.headers.token;
    try {
      if (!accessToken) {
        throw Error('getUserByToken(), missed required param: accessToken');
      }
      const response = await userService.getUserByToken(accessToken);
      return httpResponse.ok(res, response);
    } catch (e) {
      return httpResponse.fail(res, e.message);
    }
  }

}

module.exports = new userController()