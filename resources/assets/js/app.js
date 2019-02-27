
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Application from './Application';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart as fasHeart, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

library.add(fasHeart, farHeart, faChevronLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

var store = {
    state: {
        likesCount: 0,
        likes: [],
        comics: [],
        watchBottom: false,
    }
}

const app = new Vue({
    el: '#application',
    render: h => h(Application),
    data: {
        sharedState: store.state
    }
});
