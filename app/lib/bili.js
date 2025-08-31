export async function getCidAvid(bv, p = undefined) {
    if (p) {
        return fetch(`https://api.bilibili.com/x/web-interface/view/detail?bvid=${bv}&need_operation_card=0&web_rm_repeat=0&need_elec=0`)
            .then(res => res.json())
            .then(data => ({ cid: data.data.View.pages[p - 1].cid, avid: data.data.View.aid }))
    }

    return fetch(`https://api.bilibili.com/x/web-interface/view/detail?bvid=${bv}&need_operation_card=0&web_rm_repeat=0&need_elec=0`)
        .then(res => res.json())
        .then(data => ({ cid: data.data.View.cid, avid: data.data.View.aid }))
}

export async function getBvSrc(qn, p, bvid, SESSDATA) {
    const quality = qn || 80

    var { cid, avid } = await getCidAvid(bvid, p)
    const url = `https://api.bilibili.com/x/player/playurl?avid=${avid}&cid=${cid}&qn=${quality}`
    return await fetch(url, {
        "headers": {
            "Referer": "https://www.bilibili.com/",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Cookie": SESSDATA ? "SESSDATA=" + SESSDATA + ";" : "",
        }
    })
        .then(res => res.json())
        .catch(error => error)
}

export async function getMetadataByEpid(epid) {
    return fetch('https://api.bilibili.com/pgc/view/web/season?ep_id=' + epid).then(res => res.json());
}