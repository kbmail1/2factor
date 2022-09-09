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

export const getUser = (user: string) => {
  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    if (user == element.user) {
      return { user: element.user, password: element.password }
    }
  }
  return null
}

export const validatePassword = async (user: string, plain_password: string) => {
  let credentials = getUser(user)
  if (credentials === null) {
    return false
  }
  const result = await bcrypt.compare(plain_password, credentials.password)
  return result
}

export const saveUser = async (user: string, password: string) => {
  const salt = bcrypt.genSaltSync()
  let hash_password = await bcrypt.hash(password, salt)
  users.push({ user, password: hash_password })
  _updateFile()
}

export const removeUser = (user: string) => {
  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    if (user === element.user) {
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
console.log('after get kundan: ', x.user)
console.log('after get kundan: ', x.password)

removeUser('kavin')
console.log('after remove kavin: ', users)

saveUser('tanay', 'tanaypass')
console.log('after save tanay: ', users)
*/