import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addCookie, changeCookie, deleteCookie, userCookie} from "@/app/script";

type OrderCookie = {
  id: number | null;
  category: string;
  main_img: string;
  name: string;
  price: number | null;
  sale: number | null;
  size: string;
  color: string;
  count: number;
}[];

type Cookie = {
  likeItems: {
    id: number | null;
  }[];
  orderItems: OrderCookie;
  userSales: number | null;
  userTotal: number | null;
}


const initialState: Cookie = {
  likeItems: [{
    id: null,
  }],
  orderItems: [{
    id: null,
    color: "",
    size: "",
    main_img: "",
    name: "",
    price: null,
    category: "",
    sale: null,
    count: 1,
  }],
  userSales: null,
  userTotal: null,
};

const cookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    getUserTotal: (state: { userTotal: number | null }, action: PayloadAction<OrderCookie>) => {
      state.userTotal = action.payload.map(item => {
        if (item.price) {
          return item.price * item.count;
        } else {
          return 0;
        }
      }).reduce((prev, next) => prev + next);
    },
    getUserSales: (state: { userSales: number | null }, action: PayloadAction<OrderCookie>) => {
      state.userSales = action.payload.map(item => {
        if (item.sale && item.price) {
          return Math.round(item.price * (item.sale / 100) * item.count);
        } else {
          return 0;
        }
      }).reduce((prev, next) => prev + next);
    },
    getLikeCookie: (state: { likeItems: { id: number | null }[] }) => {
      state.likeItems = userCookie("likeItems=");
    },
    addLikeCookie: (state: { likeItems: { id: number | null }[] }, action: PayloadAction<string>) => {
      state.likeItems = addCookie(action.payload, "likeItems=");
    },
    deleteLikeCookie: (state: { likeItems: { id: number | null }[] }, action: PayloadAction<string | null>) => {
      state.likeItems = deleteCookie(action.payload, "likeItems=");
    },
    getOrderCookie: (state: { orderItems: OrderCookie }) => {
      state.orderItems = userCookie("myOrder=");
    },
    addOrderCookie: (state: { orderItems: OrderCookie }, action: PayloadAction<string>) => {
      state.orderItems = addCookie(action.payload, "myOrder=");
    },
    deleteOrderCookie: (state: { orderItems: OrderCookie }, action: PayloadAction<string>) => {
      state.orderItems = deleteCookie(action.payload, "myOrder=");
    },
    changeOrderCookie: (state: { orderItems: OrderCookie }, action: PayloadAction<{ item: string, param: string }>) => {
      state.orderItems = changeCookie(action.payload.item, action.payload.param);
    },
    removeMyOrders: (state: { orderItems: OrderCookie, userSales: number | null, userTotal: number | null }) => {
      state.orderItems = [{
        id: null,
        color: "",
        size: "",
        main_img: "",
        name: "",
        price: null,
        category: "",
        sale: null,
        count: 1,
      }];
      state.userTotal = null;
      state.userSales = null;
    }
  }
});

export const {
  getUserTotal,
  getUserSales,
  getLikeCookie,
  addLikeCookie,
  deleteLikeCookie,
  getOrderCookie,
  addOrderCookie,
  deleteOrderCookie,
  changeOrderCookie,
  removeMyOrders,
} = cookieSlice.actions;
export default cookieSlice.reducer;