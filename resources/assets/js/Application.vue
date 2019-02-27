<template>
    <div class="container">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="nav navbar-nav pull-left">
                    <button
                            class="btn navbar-btn"
                            type="button"
                            v-show="current.name == views[1].name"
                            @click="showFeed"
                    >
                        <font-awesome-icon
                                :icon="['fas', 'chevron-left']"
                                size="lg"
                                :style="{color: 'white'}"
                        >
                        </font-awesome-icon>
                    </button>
                </div>

                <div class="nav navbar-nav pull-right">
                    <button
                            class="btn navbar-btn"
                            type="button"
                            @click="showFavorites"
                    >
                        <font-awesome-icon
                                :icon="['fas', 'heart']"
                                size="lg"
                                :style="{color: 'darkred'}"
                        />
                        <span v-show="$root.$data.sharedState.likesCount" class="badge">{{ $root.$data.sharedState.likesCount }}</span>
                    </button>
                    <button type="button" class="btn navbar-btn" @click="logout">Logout</button>
                </div>
            </div>
        </nav>
        <div class="row" id="components">
            <div class="col">
                <keep-alive>
                    <component :is="currentComponent"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>

    import ApplicationApi from './api/ApplicationApi'
    import XkcdApi from './api/XkcdApi'
    import Feed from './components/FeedComponent'
    import Favorite from './components/FavoritesComponent'

    export default {
        components: {
            Feed,
            Favorite
        },
        data () {
            return {
                views: [
                    { name: 'Feed', componentName: 'feed' },
                    { name: 'Favorite', componentName: 'favorite' }
                ],
                current: null,
            }
        },
        created () {
            console.log('Application Created')
            this.showFeed()
        },
        mounted () {
            console.log('Application Mounted')
            ApplicationApi.getLikes().then((likes) => {
                this.$root.$data.sharedState.likes = likes.likes
                this.$root.$data.sharedState.likesCount = likes.count
            })
        },
        computed: {
            currentComponent () {
                return this.current.componentName
            }
        },
        methods: {
            isActive (component) {
                return this.current.name === component.name
            },
            showFeed () {
                this.$root.$data.sharedState.watchBottom = true
                this.current = this.views[0]
            },
            showFavorites () {
                this.$root.$data.sharedState.watchBottom = false
                this.current = this.views[1]
            },
            logout () {
                ApplicationApi.logout()
            }
        }
    }
</script>

<style scoped>
    #components {
        padding-top: 65px
    }

    .navbar-btn {
        background-color: black;
        color: white;
    }
</style>