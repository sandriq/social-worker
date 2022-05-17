const { models } = require('mongoose');
const moment = require('moment');

const getOrganizations = async () => {
  return models.Organization.find();
}

const addOrganization = async (body) => {
  const {
    name
  } = body
  return models.Organization.create({
    name,
    is: {
      enabled: true
    }
  })
}

const updateOrganization = async (body) => {
  if (!body?.id) {
    throw new Error(`Организация не найден`)
  }
  return models.Organization.findByIdAndUpdate(body.id, body);
}

const deleteOrganization = async (body) => {
  const {id} = body;
  if (!id) {
    throw new Error(`no feedback id`)
  }
  return await models.Organization.findByIdAndDelete(id);
}

const getOrganization = async (id) => {
  return models.Organization.findById(id);
}

module.exports = {
  getOrganizations,
  addOrganization,
  deleteOrganization,
  updateOrganization,
  getOrganization
};