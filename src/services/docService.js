const { models } = require('mongoose');

const getDocs = async () => {
  return models.Doc.find();
}

const addDoc = async (body) => {
  const {
    location,
    name,
  } = body
  return models.Doc.create({
    name,
    location,
    is: {
      enabled: true
    }
  })
}

const updateDoc = async (body) => {
  if (!body?.id) {
    throw new Error(`Документ не найден`)
  }
  return models.Doc.findByIdAndUpdate(body.id, body)
}

const deleteDoc = async (body) => {
  const {id} = body;
  if (!id) {
    throw new Error(`no doc id`)
  }
  return await models.Doc.findByIdAndDelete(id);
}

const getDoc = async (id) => {
  return models.Doc.findById(id);
}



module.exports = {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc
};