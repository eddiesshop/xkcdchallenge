<template>
    <div class="card" style="background-color: #96A8C8" @dblclick="likeClicked">
        <div class="card-body">
            <div class="row">
                <div class="col-sm-6 col-md-6">
                    <div class="pull-left">
                        <h3 class="card-title">{{ title }}</h3>
                        <h6 class="card-subtitle">#{{ num }} <strong>&bull;</strong> {{ postDate }}</h6>
                    </div>
                </div>
                <div class="col-sm-6 col-md-6">
                    <div class="pull-right">
                        <font-awesome-icon
                                :icon="icon"
                                size="3x"
                                :style="color"
                                @click="likeClicked()"
                        />
                    </div>
                </div>
            </div>
            <div class="text-center">
                <img :src="comic.img" :alt="comic.alt" class="image-responsive center-block">
            </div>
            <br>
            <p class="card-text text-center">{{ cardText }}</p>
        </div>
    </div>
</template>

<script>
    import * as moment from 'moment'
    import ApplicationApi from '../../js/api/ApplicationApi'

    export default {
        props: {
            comic: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                liked: false
            }
        },
        computed: {
            title () {
                return this.comic.title
            },
            num () {
                return this.comic.num
            },
            postDate () {
                return moment({
                    year: this.comic.year,
                    month: this.comic.month - 1,
                    day: this.comic.day
                }).format('MMMM Do YYYY')
            },
            cardText () {
                return this.comic.alt
            },
            icon () {
                let version = this.computedLike ? 'fas' : 'far'

                return [version, 'heart']
            },
            color () {
                return this.computedLike ? {color: 'darkred'} : ''
            },
            computedLike () {
                return this.comic.liked
            }
        },
        beforeMount () {
            ApplicationApi.isLiked(this.comic.num).then((liked) => {
                Vue.nextTick(() => {
                    Vue.set(this.comic, 'liked', liked)
                })
            })
        },
        methods: {
            likeClicked () {
                return !this.computedLike ? this.like() : this.unlike()
            },
            like () {
                return ApplicationApi.postLike(this.comic.num).then((liked) => {
                    console.log('Comic has been liked', liked)
                    this.liked = liked
                    Vue.nextTick(() => {
                        Vue.set(this.comic, 'liked', liked)
                    })
                    this.$root.$data.sharedState.likes.push(Object.assign({}, this.comic))
                    this.$root.$data.sharedState.likesCount = this.$root.$data.sharedState.likes.length
                })
            },
            unlike () {
                return ApplicationApi.deleteLike(this.comic.num).then((deleted) => {
                    console.log('Comic has been un-liked', deleted)
                    this.liked = !deleted
                    Vue.nextTick(() => {
                        Vue.set(this.comic, 'liked', !deleted)
                    })
                    this.$root.$data.sharedState.likes = this.$root.$data.sharedState.likes.filter((like, index) => {
                        return like.num != this.comic.num
                    })

                    this.$root.$data.sharedState.comics.some((comic) => {
                        if(comic.num == this.comic.num){
                            comic.liked = false
                            return true
                        }
                    })

                    this.$root.$data.sharedState.likesCount = this.$root.$data.sharedState.likes.length
                })
            }
        }
    }
</script>

<style scoped>
    /*img {
        height: 100%;
        width: 100%;
    }*/
    img {
        max-width: 100%;
        max-height: 100%;
        margin: auto;
        display:block;
    }

    .card {
        background-color: #96A8C8;
    }

    .card h3 {
        color: #FFFFFF;
    }

    .card h6,
    .card p {
        color: #505B6E;
    }
</style>