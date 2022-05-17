const { models } = require('mongoose');

const getCustomers = async () => {
  const customers = await models.Customer.find();
  return await Promise.all(customers.map(async (customer) => {
    if (customer.doc) {
      customer.doc = await models.Doc.findById(customer.doc);
    }
    return customer
  }))
}

const addCustomer = async (body) => {
  const {
    name,
    lat,
    lon,
    doc,
    address,
    photo,
    phone,
    extraInfo,
    plan,
  } = body

  return models.Customer.create({
    name,
    lat,
    lon,
    doc,
    phone,
    address,
    photo,
    extraInfo,
    plan,
    is: {
      enabled: true
    }
  })
}

const updateCustomer = async (body) => {
  if (!body?.id) {
    throw new Error(`Отзыв не найден`)
  }
  return models.Customer.findByIdAndUpdate(body.id, body)
}

const deleteCustomer = async (body) => {
  const {id} = body;
  if (!id) {
    throw new Error(`no delete id`)
  }
  return await models.Customer.findByIdAndDelete(id);
}

const getCustomer = async (id) => {
  const customer = await models.Customer.findById(id);
  if (customer.doc) {
    customer.doc = await models.Doc.findById(customer.doc);
  }
  return customer
}

module.exports = {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer
};