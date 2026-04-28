import userModel from "../models/user.js";

function getUsers(name, job) {
  if (name && job) {
    return userModel.find({ name: name, job: job });
  }
  else if (name) {
    return findUserByName(name);
  }
  else if (job) {
    return findUserByJob(job);
  }
  else {
    return userModel.find();
  }
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(id){
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};
