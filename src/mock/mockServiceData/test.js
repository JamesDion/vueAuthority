import Mock from 'mockjs';

let list  = []; 
export default {
    getMyTestData : () =>{
        list.push(Mock.mock({
            "110000": "北京市",
            "120000": "天津市",
            "130000": "河北省",
            "140000": "山西省"
        }));
        return  {
            code: 200,
            data : list
        }
    }
}