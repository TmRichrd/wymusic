import { playMode } from "../common/config";
const state = {
    homoloading: false, //首页加载状态
    singer: [],
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
};
export default state;