import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {URL} from "../../constants";
import {FormValues} from "@/app/components/AddProduct";

type Categories = {
  name_category: string
}[];

type Product = {
  category: string;
  code: string | null;
  colors: string[];
  date: string | null;
  id: number | null;
  name: string;
  price: number | null;
  sale: number | null;
  sizes: string[] | null;
  views: number | null;
  main_img: string | undefined;
  sub_img: string;
  description: string;
  isLike: boolean;
};

type Products = {
  categories: Categories;
  products: Product[];
  product: Product;
  sort_popular: Product[];
  sort_sale: Product[];
  error: string;
};

export const getCategory = createAsyncThunk<Products, undefined>(
  "product/getCategory",
  async () => {
    const response = await fetch(URL + "/categories");
    return await response.json();
  });

export const getItems = createAsyncThunk<Products, number | null>(
  "product/getItems",
  async (page: number | null) => {
    const response = await fetch(URL + "/items/" + page);
    return await response.json();
  });

export const getProducts = createAsyncThunk<Products, { path: string, page: number | undefined }>(
  "product/getProducts",
  async (value: { path: string, page: number | undefined }) => {
    const response = await fetch(URL + "/clothes/" + value.path + "/" + value.page);
    return await response.json();
  });

export const addCategory = createAsyncThunk<Products, string>(
  "product/addCategory",
  async (category: string) => {
    const response = await fetch(URL + "/category/add/" + category, {method: "POST"});
    return await response.json();
  });

export const deleteCategory = createAsyncThunk<Products, string>(
  "product/deleteCategory",
  async (category: string) => {
    const response = await fetch(URL + "/category/delete/" + category, {method: "DELETE"});
    return await response.json();
  });

export const sortProduct = createAsyncThunk<Products, { category: string, type: string, page: number | undefined }>(
  "product/sortProduct",
  async (value: { category: string, type: string, page: number | undefined }) => {
    const response = await fetch(URL + `/category/clothes/sort${value.type}category${value.category}page${value.page}`, {method: "POST"});
    return await response.json();
  });

export const addProduct = createAsyncThunk<Products, FormValues>(
  "product/addProduct",
  async (value: FormValues) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("price", value.price.toString());
    formData.append("sale", value.sale.toString());
    formData.append("description", value.description);
    formData.append("size", JSON.stringify(value.size));
    formData.append("color", JSON.stringify(value.color));
    formData.append("main_img", "/png/big/" + value.mainImage);
    formData.append("category", value.category);
    const sub_img = value.gallery.map(file => {
      return "/png/big/" + file.name
    });
    value.gallery.forEach(file => {
      if (file.image) {
        formData.append("images", file.image);
      }
    });
    formData.append("sub_img", sub_img.toString());

    const response = await fetch(URL + `/category/clothes/addProduct`, {
      method: "POST",
      headers: new Headers({"Authorization": `${value.token}`}),
      body: formData,
    });
    return await response.json();
  });

export const getItem = createAsyncThunk<Products, number | null>(
  "product/getItem",
  async (id: number | null) => {
    const response = await fetch(URL + `/item/` + id);
    return await response.json();
  });

export const getNewItems = createAsyncThunk<Products, number | null>(
  "product/getNewItems",
  async (page: number | null) => {
    const response = await fetch(URL + `/newItems/` + page);
    return await response.json();
  });

export const getSaleItems = createAsyncThunk<Products, number | null>(
  "product/getSaleItems",
  async (page: number | null) => {
    const response = await fetch(URL + `/sale/` + page,
    );
    return await response.json();
  });

const initialState: Products = {
  categories: [{name_category: ""}],
  products: [],
  product: {
    category: "",
    code: "",
    colors: [""],
    date: "",
    id: null,
    name: "",
    price: null,
    sale: null,
    sizes: [""],
    views: null,
    main_img: "",
    sub_img: "",
    description: "",
    isLike: false,
  },
  sort_popular: [],
  sort_sale: [],
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setError: (state: { error: string }, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state: Products, action: PayloadAction<Products>) => {
      state.categories = action.payload.categories;
    });
    builder.addCase(getItems.fulfilled, (state: Products, action) => {
      state.products = action.payload.products;
    });
    builder.addCase(getProducts.fulfilled, (state: Products, action) => {
      state.products = action.payload.products;
      // state.error = action.payload.error;
    });
    builder.addCase(addProduct.fulfilled, (state: Products, action) => {
      state.products = action.payload.products;
    })
    builder.addCase(addCategory.fulfilled, (state: Products, action) => {
      state.categories = action.payload.categories;
    });
    builder.addCase(deleteCategory.fulfilled, (state: Products, action) => {
      state.categories = action.payload.categories;
    });
    builder.addCase(sortProduct.fulfilled, (state: Products, action) => {
      state.products = action.payload.products;
    });
    builder.addCase(getItem.fulfilled, (state: Products, action) => {
      state.product = action.payload.product;
    });
    builder.addCase(getNewItems.fulfilled, (state: Products, action) => {
      state.products = action.payload.products;
    });
    builder.addCase(getSaleItems.fulfilled, (state: Products, action) => {
      state.products = action.payload.products;
    });
  }
});
export const {} = productSlice.actions;
export default productSlice.reducer;