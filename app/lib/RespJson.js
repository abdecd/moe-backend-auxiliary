import zlib from "node:zlib";

export default (obj) => {
    return new Response(
        zlib.gzipSync(JSON.stringify(obj)),
        {
            status: 200,
            headers: {
                "content-encoding": "gzip",
                "content-type": "application/json",
                "access-control-allow-origin": "*",
            }
        });
}