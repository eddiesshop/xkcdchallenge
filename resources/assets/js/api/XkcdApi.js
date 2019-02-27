import axios from 'axios'

const endpoint = "https://xkcd.now.sh/"

const instance = axios.create({
    baseURL: endpoint,
    transformRequest: (data, headers) => {
        delete headers.common['X-CSRF-TOKEN']

        return data
    }
})

let loading = false
let lastNumberSeen;

export default {
    getComic (id) {
        //Send empty fulfilled promise if request is still loading
        if(loading) return new Promise((resolve, reject) => {
            resolve();
        })

        console.log('Calling XKCD API')
        loading = true
        let comicId = id ? id : lastNumberSeen - 1
        comicId = comicId >= 0 ? String(comicId) : ''

        return instance.get(comicId)
            .then(response => {
                loading = false
                lastNumberSeen = response.data.num
                return response.data
            })
    }
}