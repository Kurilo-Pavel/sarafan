import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {URL} from "../../constants";
import {useAppDispatch} from "@/app/store/hooks";

export const getCategory = createAsyncThunk(
  "clothes/getCategory",
  async () => {
    const response = await fetch(URL + "/categories");
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `error ${response.status}`;
    }
  }
);

export const getItems = createAsyncThunk(
  "products/getItems",
  async (page: number | undefined) => {
    const response = await fetch(URL + "/items/" + page);
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `error ${response.status}`
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (value: { path: string, page: number | undefined }) => {
    const response = await fetch(URL + "/clothes/" + value.path + "/" + value.page);
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `error ${response.status}`
    }
  }
);

export const addCategory = createAsyncThunk(
  "clothes/addCategory",
  async (category: string) => {
    const response = await fetch(URL + "/category/add/" + category, {method: "POST"});
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `error ${response.status}`;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "clothes/deleteCategory",
  async (category: string) => {
    const response = await fetch(URL + "/category/delete/" + category, {method: "DELETE"});
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `error ${response.status}`;
    }
  }
);

export const sortProduct = createAsyncThunk(
  "product/sortProduct",
  async (value: { category: string, type: string, page: number | undefined }) => {
    const response = await fetch(URL + `/category/clothes/sort${value.type}category${value.category}page${value.page}`, {method: "POST"});
    const data = await response.json();
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (value: {
    name: string;
    price: string;
    sale: string;
    description: string;
    size: string[];
    color: string[];
    mainImage: string | undefined;
    gallery: {
      size: number | undefined;
      image: Blob | undefined;
      name: string;
      type: string;
    }[];
    token: string;
    category: string;
  }) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("price", value.price.toString());
    formData.append("sale", value.sale.toString());
    formData.append("description", value.description);
    formData.append("size", JSON.stringify(value.size));
    formData.append("color", JSON.stringify(value.color));
    formData.append("main_img", "/png/big/" + value.mainImage);
    formData.append("category", value.category);
    const sub_img = value.gallery.map(file => "/png/small/" + file.image);
    formData.append("sub_img", sub_img.toString());

    const response = await fetch(URL + `/category/clothes/addProduct`, {
      method: "POST",
      headers: new Headers({"Authorization": `${value.token}`}),
      body: formData,
    });
    const data = await response.json();
    return data;
  }
);

export const getItem = createAsyncThunk(
  "item/getItem",
  async (id: string) => {
    const response = await fetch(URL + `/item/` + id);
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `error ${response.status}`
    }
  }
);

export const getNewItems = createAsyncThunk(
  "item/getNewItems",
  async (page: number | undefined) => {
    const response = await fetch(URL + `/newItems/` + page);
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `error ${response.status}`
    }
  }
);

export const getSaleItems = createAsyncThunk(
  "item/getSaleItems",
  async (page: number | undefined) => {
    const response = await fetch(URL + `/sale/` + page,
      // {
      // method: "GET",
      // credentials: "include"
      // }
    );
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return `error ${response.status}`
    }
  }
);

// export const getMyOrders =
//   (orders: string[]) => {
//     let item:any;
//     orders.map(async id => {
//       console.log(id)
//       if (id) {
//         item = getItem(id);
//       }
//     });
//     return item
//   };

type Categories = {
  name_category: string
}[];

type Product = {
  category: string;
  code: string | null;
  color: string;
  date: string | null;
  id: number;
  name: string;
  price: number;
  sale: number | null;
  size: string | null;
  views: number | null;
  main_img: string | undefined;
  sub_img: [string];
}[];

type Products = {
  categories: Categories;
  products: Product;
  item: Product;
  sort_popular: Product;
  sort_sale: Product;
  section: { title: string, path: string };
  myOrders: Product;
};

const initialState: Products = {
  categories: [{name_category: ""}],
  products: [],
  item: [],
  sort_popular: [],
  sort_sale: [],
  section: {title: "", path: ""},
  myOrders: [],
};

const productSlice = createSlice<Products>({
  name: "product",
  initialState,
  reducers: {
    setSection: (state: { section: { title: string, path: string } }, action) => {
      state.section = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action: any) => {
      state.categories = action.payload;
    });
    builder.addCase(getItems.fulfilled, (state, action: any) => {
      state.products = action.payload;
    });
    builder.addCase(getProducts.fulfilled, (state, action: any) => {
      state.products = action.payload;
    });
    builder.addCase(addCategory.fulfilled, (state, action: any) => {
      state.categories = action.payload;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action: any) => {
      state.categories = action.payload;
    });
    builder.addCase(sortProduct.fulfilled, (state, action: any) => {
      state.products = action.payload;
    });
    builder.addCase(getItem.fulfilled, (state, action: any) => {
      state.item = action.payload;
    });
    builder.addCase(getNewItems.fulfilled, (state, action: any) => {
      state.products = action.payload;
    });
    builder.addCase(getSaleItems.fulfilled, (state, action: any) => {
      state.products = action.payload;
    });
    // builder.addCase(getMyOrders(), (state: any, action: any) => {
    //   console.log(action)
    // });
  }
});
export const {
  setSection, getMyOrders
} = productSlice.actions;
export default productSlice.reducer;