import * as jwt from 'jsonwebtoken'
import { JWT } from './config'
import bcrypt from 'bcryptjs'
import * as db from './db'
import * as fs from 'fs'

export const token_secret = JWT.TOKEN_SECRET || 'my_secret_key'
export const jwtExpirySeconds = JWT.expires_in || '180d'

export const generateAccessToken = (payload: string | object | Buffer) => {
    console.log('ddd', jwtExpirySeconds)
    try {
        return jwt.sign(payload, token_secret, {
            algorithm: 'HS256',
        })
    } catch (error) {
        console.log('error ----------')
        console.log(error)
       throw error
    }
}

export const verifyJwt = (token: string) => {
    try {
        return jwt.verify(token, token_secret)
    } catch (error) {
        throw error
    }
}