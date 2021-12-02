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

type Products = {
  id: number;
  name: string;
  image: string;
  ingredients: string;
  price: number;
  amount: number;
};

type Order = {
  date: string;
  products: string;
  total: number;
}

const api = {
  getCategories: async () => {
    // const res = await fetch(`${baseline}/categories`);
    try {
      const { data: json } = await apiAxios.get(`/categories`);
      return json;
    } catch (error) {
      console.log(error);
    }
  },

  getProducts: async (category: number, page: number, search: string) => {
    let fields = {} as Fields;
    if(category !== 0) {
      fields.category = category.toString();
    }
    if(page > 0) {
      fields.page = page.toString();
    }
    if(search !== '') {
      fields.search = search;
    }
    let queryStrings = new URLSearchParams(fields).toString();

    // const res = await fetch(`${baseline}/products?${queryStrings}`);
    // const res = await fetch(`/products?${queryStrings}`);
    // const json = await res.json();
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
      console.log(status);
      return {status, msg};
    } catch (error) {
      console.log(error);
      return {status: 400, msg: "Email already registered"};
    }
  },

  login: async (email: string, password: string) => {
    try {
      const {data, status, headers} = await apiAxios.post('/auth/login', {
        email, password
      });
      if(status === 201) {
        localStorage.setItem("authToken", headers.authorizationtoken);
      }
      return {email: data, status: 201, msg: "User logged in"};
    } catch (error) {
      console.log(error);
      return {status: 400, msg: "Username or Password incorrect"};
    }
  },

  address: async (email: string) => {
    try {
      const { data } = await apiAxios.post('/address', {
        email
      });
      return data;
    } catch (error) {
      console.log(error);
      return {status: 400};
    }
  },

  newOrder: async (order: Order) => {
    try {
      const { status } = await apiAxios.post('/newOrder', {
        order
      });
      return status;
    } catch (error) {
      console.log(error);
      return {status: 400};
    }
  },

  getOrders: async () => {
    try {
      const { data, status } = await apiAxios.get('/orders');
      for(let i in data.result) {
        data.result[i].date = data.result[i].date.split(" ");
        data.result[i].products = JSON.parse(data.result[i].products);
      }
      return {data, status};
    } catch (error) {
      console.log(error);
      return {status: 400};
    }
  },
}

export default api;