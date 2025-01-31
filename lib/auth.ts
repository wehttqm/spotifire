"use server"
import axios from 'axios'
import { cookies } from 'next/headers'
import * as jose from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any, exp_time: string) {
    return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp_time)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jose.jwtVerify(input, key, {
        algorithms: ['HS256']
    });
    return payload
    
}

export async function getSession() {
    const session = cookies().get('session')?.value;
    if (!session) {
        // fetch new session using refresh (if it exists)
        await refresh()
        const session2 = cookies().get('session')?.value;
        if (!session2) {
            return null;
        }
        return await decrypt(session2)
    }
    return await decrypt(session)
}

export async function refresh() {
    const refresh = cookies().get('refresh')?.value;

    if (!refresh) return;

    const { refresh_token } = await decrypt(refresh)

    const { data } = await axios.post('http://localhost:3000/api/refresh', { refresh_token })
    console.log("Refresh")
    await setCookie(data)

    
}

export async function login(code: string) {
    const { data } = await axios.post('http://localhost:3000/api/login', { code })
    console.log("Login")
    setCookie(data)
}

export async function setCookie(data: any) {
    try {
        const { access_token, refresh_token, expires_in } = data.body

        const expires = new Date(Date.now() + expires_in * 1000)
        const session = await encrypt({access_token, expires}, '1 hour')
        console.log("New Cookie:", access_token)
        cookies().set('session', session, { httpOnly: true, expires })
        
        if (refresh_token) {
            const refresh = await encrypt({refresh_token}, '30 days')
            cookies().set('refresh', refresh, { httpOnly: true, expires: new Date().setDate(new Date().getDate() + 30)}) // expires in 30 days
        }

    } catch (err) {
        console.log(err)
    }
}