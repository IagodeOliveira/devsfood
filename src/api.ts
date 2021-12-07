import axios from 'axios';

// let baseline = 'https://api.b7web.com.br/devsfood/api';

const apiAxios = axios.create({
  baseURL: ''
});

type Fields = {
  category?: string;
  page?: string;
  search?: string;
}

type Obj = {
  name: string;
  email: string;
  password: string;
  state: string;
  city: string;
  address: string;
  phone: string;
}

type Order = {
  date: string;
  products: string;
  total: number;
}

const api = {
  getCategories: async () => {
    try {
      const { data: json } = await apiAxios.get(`/categories`);
      return json;
    } catch (error) {
      console.log(error);
    }
  },

  getProducts: async (category: number, page: number, search: string) => {
    let fields = {} as Fields;
    if (category !== 0) {
      fields.category = category.toString();
    }
    if (page > 0) {
      fields.page = page.toString();
    }
    if (search !== '') {
      fields.search = search;
    }
    let queryStrings = new URLSearchParams(fields).toString();

    try {
      const { data: json } = await apiAxios.get(`/products?${queryStrings}`);
      return json;
    } catch (error) {
      console.log(error);
    }
  },

  signUp: async (obj: Obj) => {
    try {
      const { data: msg, status } = await apiAxios.post('/auth/signup', {
        obj
      });
      return { status, msg };
    } catch (error) {
      return { status: 400, msg: "Email already registered" };
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { data, status, headers } = await apiAxios.post('/auth/login', {
        email, password
      });
      if (status === 201) {
        localStorage.setItem("authToken", headers.authorizationtoken);
      }
      return { email: data, status: 201, msg: "User logged in" };
    } catch (error) {
      return { status: 400, msg: "Username or Password incorrect" };
    }
  },

  newProfile: async (obj: Obj, token: string, email: string) => {
    try {
      const { data: json, status } = await apiAxios.post('/auth/newProfile', { obj, email },
        {
          headers: {
            'Content-Type': 'application/json',
            'authtoken': token
          }
        });
      return { status, json };
    } catch (error: any) {
      return { status: error.response.status, json: "" };
    }
  },

  address: async (email: string) => {
    try {
      const { data } = await apiAxios.post('/address', {
        email
      });
      return data;
    } catch (error) {
      return { status: 400 };
    }
  },

  newOrder: async (order: Order) => {
    try {
      const { status } = await apiAxios.post('/newOrder', {
        order
      });
      return status;
    } catch (error) {
      return { status: 400 };
    }
  },

  getOrders: async (email: string, token: string) => {
    try {
      const { data, status } = await apiAxios.post('/orders', { email }, {
        headers: {
          'Content-Type': 'application/json',
          'authtoken': token
        }
      });
      for (let i in data.result) {
        data.result[i].date = data.result[i].date.split(" ");
        data.result[i].products = JSON.parse(data.result[i].products);
      }
      return { data, status };
    } catch (error: any) {
      return { data: "", status: error.response.status };
    }
  },

  payment: async (token: string, products: Products[]) => {
    try {
      const { data: url, status } = await apiAxios.post('/payments', { products }, {
        headers: {
          'Content-Type': 'application/json',
          'authtoken': token
        }
      });
      return { url, status };
    } catch (error) {
      console.error(error);
    }
  },
}

export default api;