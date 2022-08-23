import * as jwt from 'jsonwebtoken'
import { JWT }  from './config'
import bcrypt from 'bcryptjs'
import * as users from './users';
import * as fs from 'fs'

export const token_secret = JWT.TOKEN_SECRET || 'my_secret_key'
export const jwtExpirySeconds = JWT.expires_in || 18000

export const generateAccessToken = (payload: string | object | Buffer) => {
    return jwt.sign(payload, token_secret, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })
}

export const doesUserExist = (userId: string): boolean => {
    for (const user of users.users) {
        if (user.userId === userId) {
            return true
        }
    }
    return false;
}

export const getUser = (userId: string): any => {
    for (const user of users.users) {
        if (user.userId === userId) {
            return { userId, password: user.password }
        }
    }
}

export const addUser = async (userId: string, password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(password, salt)

    users.users.push({ userId, password: hash_password })
    fs.writeFileSync('./users.ts', JSON.stringify(users, null, 2))
}

export const verifyJwt = (token: string) => {
    return jwt.verify(token, token_secret)
}