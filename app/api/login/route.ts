import { NextResponse } from "next/server"

const SpotifyWebAPI = require('spotify-web-api-node')

export async function POST(req: Request) {
    const { code } = await req.json()
    const spotifyApi = new SpotifyWebAPI({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI
    })
    try {
        const data = await spotifyApi.authorizationCodeGrant(code)
        return NextResponse.json(data)
    } catch (err) {
        console.log('LOGIN POST ERROR:', err)
        return new NextResponse("Internal error", { status: 500 })
    }

}
