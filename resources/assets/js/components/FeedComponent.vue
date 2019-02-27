<template>
    <list
            :comics="$root.$data.sharedState.comics"
            @load-more="loadComic"
    ></list>
</template>

<script>

    import XkcdApi from '../api/XkcdApi'
    import List from './ListComponent'

    export default {
        components: {
            List
        },
        created () {
            console.log('Feed Created')
        },
        mounted () {
            console.log('Feed Mounted')
        },
        methods: {
            loadComic () {
                return XkcdApi.getComic().then( (comic) => {
                    if(comic) this.$root.$data.sharedState.comics.push(comic)
                })
            }
        }
    }
</script>

<style scoped>

</style>