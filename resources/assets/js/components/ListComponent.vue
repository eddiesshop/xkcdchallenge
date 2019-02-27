<template>
    <ul class="list-group" style="list-style-type: none">
        <li class="list-group-item" v-for="comic in comics">
            <comic :comic="comic"></comic>
        </li>
    </ul>
</template>

<script>
    import Comic from './ComicComponent'

    export default {
        components: {
            Comic
        },
        props: {
            comics: {
                type: Array,
                required: true
            }
        },
        data () {
            return {
                bottomVisible: false,
                cb: null
            }
        },
        mounted () {

            if (this.$root.$data.sharedState.watchBottom) {
                window.addEventListener('scroll', () => {
                    this.bottomVisible = this.isBottomVisible()
                })

                do {
                    this.$emit('load-more')
                } while (this.bottomVisible)
            }else{
                window.removeEventListener('scroll', this.cb, false)
            }
        },
        watch: {
            bottomVisible () {
                console.log('Bottom Visible Prop Changed')
                if(this.$root.$data.sharedState.watchBottom && this.bottomVisible) this.$emit('load-more')
            },
            comics: {
                deep: true,
                handler () {
                    if(this.$root.$data.sharedState.watchBottom) this.bottomVisible = this.isBottomVisible()
                }
            }
        },
        methods: {
            isBottomVisible () {
                const scrollY = window.scrollY
                const visible = document.documentElement.clientHeight
                const pageHeight = document.documentElement.scrollHeight
                const bottomOfPage = visible + scrollY + 30 >= pageHeight

                console.log('Is bottom visible?', bottomOfPage || pageHeight < visible)
                return bottomOfPage || pageHeight < visible
            },
            handleScroll () {
                if(this.$root.$data.sharedState.watchBottom) this.bottomVisible = this.isBottomVisible()
            }
        }
    }
</script>

<style scoped>
    .list-group-item {
        background-color: #96A8C8;
    }
</style>