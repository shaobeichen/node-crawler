/**
 * json转URL参数
 * @param json json
 * @returns {string} url参数
 */
const params = (json) => {
    return Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }).join("&");
}

module.exports = params;