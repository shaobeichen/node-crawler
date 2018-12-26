class Ut {
    /**
     * 异步延迟
     * @param {number} time 延迟的时间,单位毫秒
     */
    static sleep(time = 0) {
        var StartTime = new Date().getTime();
        let i = 0;
        while (new Date().getTime() < StartTime + time * 1000) ;
    };
}

module.exports = Ut;
