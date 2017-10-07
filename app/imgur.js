'use strict';
const fetch = require('node-fetch');
const shuffle = require('knuth-shuffle').knuthShuffle;

// imgur api keys
const clientId = process.env.IMGUR_CLIENT_ID;
const clientSecret = process.env.IMGUR_CLIENT_SECRET;

function getRandomFromGalleryEarthporn(clientId){
    return fetch('https://api.imgur.com/3/gallery/r/earthporn/top/month/0.json?perPage=80&page=1?q=ext:jpg', {
        method: 'GET',
        headers: {
            'authorization': `Client-ID ${clientId}`,
            'content-type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    })  .then(res => res.json())
        .then(res => res.data)
        // if is_album true, map img to array of images and flatten it in the next step
        .then(array => array.map(img => img.is_album === false ? img.link : img.images.map(img => img.link)))
        .then(arrays => [].concat.apply([], arrays))
        .then(res => res.filter(img => img.startsWith('https://') && img.endsWith('.jpg')))  // jpg only
        .then(urlArray => shuffle(urlArray))
        .then(shuffledArray => shuffledArray[0])
        .catch(err => console.log(err));
}

function getRandomFromAlbumBestLandscapes(clientId){
    return fetch('https://api.imgur.com/3/gallery/album/s1tJR/', {
        method: 'GET',
        headers: {
            'authorization': `Client-ID ${clientId}`,
            'content-type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    })
        .then(res => res.json())
        .then(res => res.data)
        .then(data => data.images)
        .then(images => images.map(img => img.link))
        .then(urlArray => urlArray.filter(url => url.startsWith('https://') && url.endsWith('.jpg')))
        .then(urlArray => shuffle(urlArray))
        .then(urlArray => urlArray[0])
        .catch(err => console.log(err));
}

module.exports = {
    // Returns .jpg file
    getRandomLandscape: function(){
        return getRandomFromAlbumBestLandscapes(clientId);
    }
};
