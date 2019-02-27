<template>
    <list
            v-if="$root.$data.sharedState.likesCount"
            :comics="$root.$data.sharedState.likes"></list>
    <div v-else class="container-fluid">
        <div class="row text-center">
            <div class="col">
                <font-awesome-icon
                        :icon="['fas', 'heart']"
                        size="5x"
                        :style="{color: 'darkred'}"
                />
                <h2>No Favorites, Yet...</h2>
                <h5>Double-tap a comic and it will be added here</h5>
            </div>
        </div>
    </div>
</template>

<script>

    import XkcdApi from '../api/XkcdApi'
    import List from './ListComponent'

    export default {
        components: {
            List
        },
        beforeCreate () {
            console.log('Before Favorites Created')

            this.$root.$data.sharedState.likes.forEach((like, i) => {
                setTimeout(() => {
                    console.log('In Time Out')
                    XkcdApi.getComic(like.comic_id).then((comic) => {
                        console.log('Called?', comic)
                        Vue.nextTick(() => {
                            Vue.set(this.$root.$data.sharedState.likes, i, Object.assign({liked: true}, comic))
                        })
                    })
                }, i * 2800)
            })
        },
    }
</script>

<style scoped>
    .container-fluid {
        height: 75vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h2 {
        color: #FFFFFF;
    }

    h5 {
        color: #505B6E
    }
</style>