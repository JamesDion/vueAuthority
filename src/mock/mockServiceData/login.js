import Mock from 'mockjs';

export default {
    login : () =>{
        return  {
            code: 200,
            data :  Mock.mock(
                {
                    "username": "wanghao",
                    "password": "123456",
                })
        }
    }
}