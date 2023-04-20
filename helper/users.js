const users = [];
const roomUsers = [];
const { usersServices } = require("../services/users");

// const addUser = (id, user_id, property_id) => {
//     const existingUser = users.find(user => user.user_id == user_id)
//     if (existingUser) return { error: "Username has already been taken" }
//     if (!property_id) return { error: "Property Id is required" }
//     if (!user_id) return { error: "User Id is required" }
//     const user = { id, user_id, property_id }
//     users.push(user)
//     return { user }
// }
const addUser = async (id, user_id) => {

    const foundIndex = users.findIndex(user => user.user_id == user_id)
    if (foundIndex && foundIndex != -1) { 
      users[foundIndex].id = id;
      const user = users[foundIndex];
      return user
    }else{
      let getUserById = await usersServices.get(user_id);
      const user = { id, user_id }
      if(getUserById){
        user.first_name = getUserById.first_name;
        user.role = getUserById.role;
      }
      users.push(user)
      return user;
    }
}

const addUserInRoom = async (id, user_id, property_id, role) => {
  const existingUser = roomUsers.find(roomUser => roomUser.user_id == user_id && roomUser.property_id == property_id)
  if (existingUser) return { error: "User already in room" };
  const roomUser = { id, user_id, property_id, role }
  roomUsers.push(roomUser)
  return { roomUser };
}

const getRoomUser = id => {
  let user = roomUsers.find(user => user.id == id)
  return user
}


const getUser = id => {
    let user = users.find(user => user.id == id)
    return user
}

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

const deleteRoomUser = (id) => {
  const index = roomUsers.findIndex((user) => user.id === id);
  if (index !== -1) return roomUsers.splice(index, 1)[0];
}

const getUsers = (property_id) => users.filter(user => user.property_id === property_id)
const getRoomUsers = (property_id) => roomUsers.filter(user => user.property_id === property_id)

module.exports = { addUser, getUser, deleteUser, getUsers, addUserInRoom, getRoomUsers, getRoomUser, deleteRoomUser }
