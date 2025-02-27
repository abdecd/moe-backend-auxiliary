export default class R {
    /**
     * 
     * @param {number} code 
     * @param {string} msg 
     * @param {any} data 
     */
    constructor(code, msg, data) {
        this.code = code
        this.msg = msg
        this.data = data
    }
    static success(data) {
        return new this(200, null, data)
    }
    static error(msg) {
        return new this(400, msg, null)
    }
    static error(code, msg) {
        return new this(code, msg, null)
    }
}
