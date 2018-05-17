import axios from 'axios'
import store from '@/vuex/store.js'
import router from '../router'
import qs from 'qs'


const api = axios.create({});
// if (process.env.NODE_ENV == 'development') {
//     api.defaults.baseURL = 'http://192.168.3.5';
// }else if (process.env.NODE_ENV == 'production') {
//     api.defaults.baseURL = 'http://app.youhulianchuang.com';
// }
api.defaults.baseURL = 'http://app.youhulianchuang.com';
api.defaults.timeout = 5000;
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.responseType = 'json';
api.defaults.transformRequest = [function (data) {
    //数据序列化
    return qs.stringify(data);
}];



// 请求拦截
api.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    store.commit('SET_LOADING',true);
    // 如果有token,添加到请求报文 后台会根据该报文返回status
    if(store.state.login.token) {
      config.headers.Authorization = `token ${store.state.login.token}`;
    }

    return config;

  }, function (error) {
    // 对请求错误做些什么
    alert('网络错误,请稍后再试');

    store.commit('SET_LOADING',false);

    return Promise.reject(error);
  });


	// 添加响应拦截器
api.interceptors.response.use(function (response) {
  	
    store.commit('SET_LOADING',false);
  
  	return response;

	}, function (error) {
  	// 对响应错误做点什么
  	store.commit('SET_LOADING',false);

	if(errore.response) {

		if(error.response.status== 401) {
			// 如果返回401 即没有权限，跳到登录页重新登录
			store.commit('CHANGE_TOKEN',0);

			alert('请重新登录');

		}
	}

  	return Promise.reject(error);
});
export default api
