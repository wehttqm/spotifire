import { NextResponse } from "next/server"

const SpotifyWebAPI = require('spotify-web-api-node')

export async function PUT(req: Request) {
    const { access_token, track_uri } = await req.json()
    const spotifyApi = new SpotifyWebAPI({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    })
    spotifyApi.setAccessToken(access_token)

    try {
        await spotifyApi.play({"uris": [track_uri], "position_ms": 0})
        return new NextResponse('OK', {status: 200})
    } catch (err) {
        console.log('REFRESH POST ERROR:', err)
        return new NextResponse("Internal error", { status: 500 })
    }

}