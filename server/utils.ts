import * as jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from './config'
import bcrypt from 'bcryptjs'
import * as db from './db'
import * as fs from 'fs'

export const token_secret = TOKEN_SECRET || 'my_secret_key'

export const generateAccessToken = (username) => {
    return jwt.sign(username, token_secret, { expiresIn: '1800s' })
}

export const verifyJwt = (token: string) => {
    try {
        return jwt.verify(token, token_secret)
    } catch (error) {
        throw error
    }
}