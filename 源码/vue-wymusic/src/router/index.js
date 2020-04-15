import Vue from "vue";
import Router from "vue-router";
import Main from "../components/Main.vue";
import Personal from "../views/personal.vue";
import Slide from "../views/slide.vue";
import Search from "../views/search.vue";
import searchlist from "../components/searchlist.vue";
import Comp from "../views/searchTab/comp.vue";
import Singles from "../views/searchTab/singles.vue";
import Singer from "../views/searchTab/singer.vue";
import Video from "../views/searchTab/video.vue";
import collection from "../views/collection.vue";
import CollectionCard from "../components/collectionCard.vue";
import Play from "../components/play.vue";
import Square from "../components/square.vue";
import Miniplay from "../components/miniplay.vue";
import Login from "../views/login.vue";
import Recoday from "../views/recoday.vue";
import SingerList from "../views/singerlist.vue";
import Singerinfo from "../views/singerinfo.vue";
import Ranklist from "../views/ranklist.vue";
Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "main",
            component: Main,
            children: [{
                    path: "/",
                    name: "personal",
                    component: Personal
                },
                {
                    path: "/slide",
                    name: "slide",
                    component: Slide
                },
                {
                    path: "/miniplay",
                    name: "miniplay",
                    component: Miniplay
                }
            ]
        },
        {
            path: "/search",
            name: "search",
            component: Search,
            children: [{
                    path: "/searchlist",
                    name: "searchlist",
                    component: searchlist
                },
                {
                    path: "/comp/:searchValue",
                    name: "comp",
                    component: Comp
                },
                {
                    path: "/singles/:searchValue",
                    name: "singles",
                    component: Singles
                },
                {
                    path: "/singer/:searchValue",
                    name: "singer",
                    component: Singer
                },
                {
                    path: "/video/:searchValue",
                    name: "video",
                    component: Video
                }
            ]
        },
        {
            path: "/collection/:id",
            name: "collection",
            component: collection
        },
        {
            path: "/collectioncard",
            name: "collectioncard",
            component: CollectionCard,
            props: true
        },
        {
            path: "/play/:id",
            name: "play",
            component: Play,
            props: true
        },
        {
            path: "/square",
            name: "square",
            component: Square
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/recoday",
            name: "recoday",
            component: Recoday,
            beforeEnter: (to, from, next) => {
                const userInfo = window.localStorage.getItem("userInfo");
                if (to.path == "/login") next();
                if (!userInfo) {
                    return next("/login");
                }
                next();
            }
        },
        {
            path: "/singerlist",
            name: "singerlist",
            component: SingerList
        },
        {
            path: "/singerinfo",
            name: "singerinfo",
            component: Singerinfo
        },
        {
            path: "/ranklist",
            name: "ranklist",
            component: Ranklist
        }
    ]
});