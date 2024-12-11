import axios from 'axios';

const api_link = 
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PRODUCTION
    : process.env.REACT_APP_API_URL_LOCAL;

const setCookie = (data, hours) => {
  const dt = new Date();
  dt.setHours(dt.setHours() + hours);
  document.cookie = `user=${data}; expires= ${dt}; path=/;`;
};

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true
};

class ServiceObj {
  captcha_key = "";

  async login(form) {
    const res = await axios.post(`${api_link}/amjad/AmjadApp/Upload`, form, config);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token};`
    setCookie(res.data.token, 3);
    // , {
    //   withCredentials: true,
    //   headers: {
    //     'Access-Control-Allow-Credentials': true,
    //   },
    // }
    // .then((res) => {
    //     axios.defaults.headers.common['Authorization'] = res.data.token;

    //     console.log(new Cookies('user'));

    //   })

    return res;
  }

  async sendData(data) {
    
    return await axios.post(`${api_link}/Upload`, data, config);
  }

  isLogged() {
    if (document.cookie) return true;
    else return false;
  }

  logOut() {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    delete axios.defaults.headers.common.Authorization;
  }
}

const Service = (function () {
  let instance;

  function createInstance() {
    const object = new ServiceObj();

    if (document.cookie) {
      const cookie = document.cookie.split(';')[0];
      const token = cookie.split('=')[1];
      axios.defaults.headers.common['Authorization'] = `Bearer ${token};`;
    }
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = true;

    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default Service.getInstance();

