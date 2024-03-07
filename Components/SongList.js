import React from 'react'


const SongList = ({song_ids}) => {
    return (
        <div>
            {song_ids.map((id) => (
                    <div style={{maxHeight: 160}}>
                        <iframe style={{borderRadius: '12px'}} 
                            src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
                            width="100%" 
                            height='200'
                            frameBorder='0'
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"></iframe>
                    </div>
            ))}
        </div>
        
    )
}

export default SongList