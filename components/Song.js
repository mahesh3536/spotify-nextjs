import React from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time'

function Song({order,track}) {
  const spotifyApi = useSpotify()
  const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState)
  const playSong = ()=>{
     setIsPlaying(true)
     setCurrentTrackId(track.track.id)
     spotifyApi.play({
        uris: [track.track.uri]
     })
  }
  return (
    <div className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer' onClick={playSong}>
      <div className='flex items-center space-x-4'>
        <p>{order+1}</p>
        <img
        src={track.track.album.images[0].url}
        className="h-10 w-10"

        />
        <div>
            <p className='text-white w-36 lg:w-64 truncate'>{track.track.name}</p>
            <p>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline'>{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
