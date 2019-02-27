import axios from 'axios'
import XkcdApi from './XkcdApi'

export default {
    postLike (comicId) {
        console.log('Liked a comic', comicId)
        return axios.post('like/' + comicId)
            .then((response) => {
                return response.data.liked
            })
    },
    deleteLike (comicId) {
        console.log('Un-liked a comic', comicId)
        return axios.delete('like/' + comicId)
            .then((response) => {
                return response.data.deleted
            })
    },
    isLiked (comicId) {
        return axios.get('like/' + comicId)
            .then((response) => {
                return response.data.liked
            })
    },
    getLikes () {
        return axios.get('likes')
            .then((response) => {
                return response.data
            })
    },
    logout () {
        return axios.post('logout')
            .then((response) => {
                window.location = response.request.responseURL
            })
    }
}