import fs from 'fs'
import bcrypt from 'bcryptjs'

let users: any = []
let data = fs.readFileSync('./users.json')
if (data == null) {
  fs.writeFileSync('./users.json', JSON.stringify([]))
} else {
  users = JSON.parse(data.toString())
  console.log(users)
}

const _updateFile = () => {
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))
}

export const getUser = (userId: string) => {
  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    if (userId == element.userId) {
      return { userId: element.userId, password: element.password }
    }
  }
  return null
}

export const validatePassword = async (userId: string, plain_password: string) => {
  let user = getUser(userId)
  if (user === null) {
    return false
  }
  const result = await bcrypt.compare(plain_password, user.password)
  return result
}

export const saveUser = async (userId: string, password: string) => {
  const salt = bcrypt.genSaltSync()
  let hash_password = await bcrypt.hash(password, salt)
  users.push({ userId, password: hash_password })
  _updateFile()
}

export const removeUser = (userId: string) => {
  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    if (userId === element.userId) {
      users.splice(index, 1)
      _updateFile()
      return
    }
  }
}

/*
saveUser('kavin', 'kavinpass')
console.log('after save kavin: ', users)

let x = getUser('kundan')
console.log('after get kundan: ', x.userId)
console.log('after get kundan: ', x.password)

removeUser('kavin')
console.log('after remove kavin: ', users)

saveUser('tanay', 'tanaypass')
console.log('after save tanay: ', users)
*/