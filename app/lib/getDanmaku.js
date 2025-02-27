import protobufjs from "protobufjs";

var protoType;
(async () => {
    const proto = protobufjs.parse(await fetch(import.meta.env.VITE_URL+"/protobuf/BiliPojo.proto").then(x=>x.text())).root
    protoType = proto.lookupType("DmSegMobileReply")
})()

/**
 * 弹幕对象
 * @typedef {Object} Danmaku
 * @property {string} id - 弹幕ID
 * @property {number} progress - 弹幕进度
 * @property {number} mode - 弹幕模式
 * @property {number} fontsize - 字体大小
 * @property {number} color - 字体颜色
 * @property {string} midHash - 用户ID哈希
 * @property {string} content - 弹幕内容
 * @property {string} ctime - 创建时间
 * @property {number} weight - 权重
 * @property {string} action - 动作
 */

/**
 * 
 * @param {*} protoType 
 * @param {*} type 1 视频弹幕 2 漫画弹幕
 * @param {*} bvid 
 * @param {*} p 从1开始
 * @param {*} segment_index 从1开始 6分钟1包
 * @param {*} SESSDATA 
 * @returns {Promise<Danmaku>}
 */
async function getDanmaku(type, bvid, p, segment_index, SESSDATA) {
    var cid = await fetch(`https://api.bilibili.com/x/player/pagelist?bvid=${bvid}&jsonp=jsonp`)
        .then(x => x.json())
        .then(x => x?.data?.[p-1]?.cid)

    var bytes = await fetch(
        `https://api.bilibili.com/x/v2/dm/web/seg.so?type=${type}&oid=${cid}&segment_index=${segment_index}`,
        {
            headers: {
                "cookie": "buvid3=BB923CF0-D53A-D440-D197-6EE711E2448C96182infoc; b_nut=1716898496; CURRENT_FNVAL=4048; b_lsid=E9CE3B9D_18FBF1F58F3; _uuid=44664B106-4E48-78CE-D10F3-CEA5E478875E53765infoc; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTcxNTc2OTcsImlhdCI6MTcxNjg5ODQzNywicGx0IjotMX0.NcDc5yHT2TqhcfxFwSPLzdTGib_bLsC2Ylg-jwkL7As; bili_ticket_expires=1717157637; buvid_fp=cf63622fc74f568d04c41636dc6ad57f; buvid4=9C1BA4C9-A1D9-1526-7831-41807C7B3ECF98236-024052812-R9tt96qYWZP01ovrYbiwVQ%3D%3D; rpdid=|(u))kkYu|Yl0J'u~uY)m)l||; bmg_af_switch=1; bmg_src_def_domain=i1.hdslb.com; enable_web_push=DISABLE; header_theme_version=CLOSE; home_feed_column=4; sid=qlhgzd7q; browser_resolution=532-593"
                    + SESSDATA ? `; SESSDATA=${SESSDATA}` : ""
            }
        }
    ).then(x => x.arrayBuffer()).then(x => new Uint8Array(x))

    var out;
    try {
        out = protoType.decode(bytes).toJSON()?.elems
        out = out.map(x => {
            var obj = {
                id: "",
                progress: 0,
                mode: 0,
                fontsize: 0,
                color: 0,
                midHash: "",
                content: "",
                ctime: "",
                weight: 0,
                action: "",
                pool: 0,
                idStr: "",
                attr: 0,
                animation: "",
                colorful: 0,
            }
            return { ...obj, ...x };
        })
    } catch (e) {
        out = bytes && new TextDecoder("utf-8").decode(bytes)
    }
    return out
}

export default getDanmaku;