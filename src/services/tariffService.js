const { models } = require('mongoose');
const moment = require('moment');

const getTariffs = async (query) => {
  return models.Tariffs.find();
}

const addTariff = async (body) => {
  const {
    price
  } = body
  return models.Tariff.create({
    price,
    is: {
      enabled: true
    }
  })
}

const updateTariff = async (body) => {
  if (!body?.id) {
    throw new Error(`Тариф не найден`)
  }
  return models.Tariff.findByIdAndUpdate(body.id, body);
}

const deleteTariff = async (body) => {
  const {id} = body;
  if (!id) {
    throw new Error(`no tariff id`)
  }
  return await models.Tariff.findByIdAndDelete(id);
}

const getTariff = async (id) => {
  return models.Tariff.findById(id);
}

module.exports = {
  getTariffs,
  addTariff,
  updateTariff,
  deleteTariff,
  getTariff
};