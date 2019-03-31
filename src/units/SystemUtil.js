import util from "./index";

export default class SystemUtil {

    

    /**
     * ajax get 请求
     * @param {*} url 
     * @param {*} success 
     * @param {*} error 
     */
    static getCurrentOrg( callback){
        util.post('/org/getCurrentOrg.do',{},callback,null);
    }

}