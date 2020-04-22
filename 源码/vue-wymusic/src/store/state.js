import { playMode } from "../common/config";
const state = {
    homoloading: true, //首页加载状态
    singer: [],
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    // 私信消息数量
    newCountMsg: "",
    // 私信
    Msg: [],
    // 是否签到
    sing_in: false
};
export default state;