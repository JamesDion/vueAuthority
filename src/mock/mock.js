import mock from 'mockjs';
import test from './mockServiceData/test';
import login from './mockServiceData/login';

mock.mock("/getMyTestData",test.getMyTestData);

mock.mock("/login",login.login);