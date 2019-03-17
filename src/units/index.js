export default class util {
    /**
     * 判断字符串是否为空
     * @param str
     * @returns {boolean}
     */
    static isNull(str) {
        return str == null || str.length === 0 || str === '';
    }

    /**
     * ajax post 请求
     * @param {*} url 
     * @param {*} params 
     * @param {*} success 
     * @param {*} error 
     */
    static post(url, params, success, error) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(params)
        }).then(res => {
            return res.json();
        }).then(json => {
            if (typeof success === "function") {
                success(json);
            }
        }).catch(err => {
            console.error(err);
            if (typeof error === "function") {
                error(err);
            }
        });
    }

    /**
     * ajax get 请求
     * @param {*} url 
     * @param {*} success 
     * @param {*} error 
     */
    static get(url, success, error) {
        fetch(url, {
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(json => {
            if (typeof success === "function") {
                success(json);
            }
        }).catch(err => {
            console.log(err);
            if (typeof error === "function") {
                error(err);
            }
        })
    }
}