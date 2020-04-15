// import { types } from "babel-core";
import lodash from "lodash";
import * as types from "./mutation-types";
import { unique } from "../common/fiter";

const mutations = {
    // changeHomeload(state) {
    //     state.homoloading = false;
    // },
    [types.SET_SINGER](state, singer) {
        state.singer = singer;
    },
    [types.SET_PLAYING](state, flag) {
        state.playing = flag;
    },
    [types.SET_FULLSCREEN](state, flag) {
        state.fullscreen = flag;
    },
    [types.SET_PLAYLIST](state, list) {
        state.plsylist = list;
    },
    [types.SET_SEQUENCELIST](state, list) {
        state.sequenceList = list;
    },
    [types.SET_MODE](state, mode) {
        state.mode = mode;
    },
    [types.SET_CURRENTINDEX](state, index) {
        state.currentIndex = index;
    },
    changeFull: state => {
        state.fullScreen = !state.fullScreen;
    },
    addSong: (state, { item, index, songid, singer, songname }) => {
        // console.log(item);
        state.playlist = item;
        state.currentIndex = index;
        state.playlist.songid = songid;
        state.playlist.singer = singer;
        state.playlist.songname = songname;
    },
    pushSong: (state, item, singer) => {
        state.singer.push(item);
        let arr1 = unique(state.singer);
        state.singer = arr1;
        state.singer.find((v, index) => {
            if (v.id == item.id) {
                state.currentIndex = index;
            }
        });
    },

    addurl: (state, url) => {
        state.playlist.url = url;
    },
    changeHomeload(state) {
        setTimeout(() => {
            state.homoloading = false;
        }, 2000);
    },
    // 点击切换歌曲
    prevSong(state, index) {
        state.currentIndex = index;
        state.playlist = state.singer[index];
    },
    // 点击歌曲获取索引
    loadIndex(state, item) {
        state.singer.find((v, index) => {
            if (v.id == item.id) {
                state.currentIndex = index;
            }
        });
    },
    // 如果是最后一首就让他为第一首
    changeCurrentIndex(state) {
        state.currentIndex = 0;
        state.playlist = state.singer[0];
    },
    // 删除单个歌曲
    deleteSong(state, index) {
        // 如果只有一首了
        if (index == 0) {
            // console.log("不能再删除了");
            state.singer = [];
            state.playlist = [];
            state.fullScreen = false;
        } else {
            state.singer.splice(index, 1);
            state.playlist = state.singer[index - 1];
            state.currentIndex = index - 1;
        }
    },
    // 删除全部播放歌曲
    deleteAllSong(state) {
        state.singer = [];
        state.fullScreen = false;
    }
};
export default mutations;