import {EMAIL, PASSWORD, LOGIN, DESCRIPTION, CATEGORY} from "./constants.mjs";

const passwordCheck = (password) => {
  if (!PASSWORD.regex().test(password)) {
    return false;
  }
  return true;
};

const emailCheck = (email) => {
  if (!EMAIL.regex().test(email)) {
    return false;
  }
  return true;
};

const loginCheck = (login) => {
  if (!LOGIN.regex().test(login)) {
    return false;
  }
  return true;
};

const descriptionCheck = (description) => {
  if (!DESCRIPTION.regex().test(description)) {
    return false;
  }
  return true;
};

const phoneCheck = (phone) => {
  if (!phone) {
    return false;
  }
  return true;
};

const categoryCheck = (category) => {
  if (!CATEGORY.regex().test(category)) {
    return false;
  }
  return true;
};

const userCookie = (section) => {
  const cookieItems = document.cookie.split(";").filter(item => {
    if (item.trim().indexOf(section) === 0) {
      return item;
    } else {
      return null;
    }
  });
  if (cookieItems.length>0) {
    return JSON.parse(cookieItems[0].trim().slice(section.length).split(","));
  } else {
    return cookieItems;
  }
};

const addCookie = (product, section) => {
  let products = userCookie(section);
  if (products.length) {

    if (products.every(item => {
      for (const key in item) {
        if (key !== "count" && item[key] !== JSON.parse(product)[key]) {
          return item;
        }
      }
    })) {
      products = [...products, JSON.parse(product)];
    } else {
      products.map(item => {
        if (item.count) {
          for (const key in item) {
            if (key !== "count") {
              if (item[key] !== JSON.parse(product)[key]) {
                return item;
              }
            }
          }
          item.count = item.count + 1;
          return item;
        }
      });
    }
    document.cookie = `${section}${JSON.stringify(products)};path=/`;
    return products;
  } else {
    document.cookie = `${section}${(JSON.stringify([JSON.parse(product)]))};path=/`;
    return [JSON.parse(product)];
  }
};

const deleteCookie = (item, section) => {
  let cookie = userCookie(section);
  const items = cookie.filter(product => {
    return JSON.stringify(product) !== item});
  document.cookie = `${section}${JSON.stringify(items)};path=/`;
  return items;
};


const changeCookie = (product, param) => {
  let items = userCookie("myOrder=");
  const value = JSON.parse(param);
  const changedItems = items.map(item => {
    if (JSON.stringify(item) === product) {
      for (const key in value) {
        item[key] = value[key];
      }
      return item;
    } else {
      return item;
    }
  });
  document.cookie = `${"myOrder="}${JSON.stringify(changedItems)};path=/`;
  return changedItems;
};

export {
  passwordCheck,
  emailCheck,
  loginCheck,
  descriptionCheck,
  phoneCheck,
  categoryCheck,
  userCookie,
  addCookie,
  deleteCookie,
  changeCookie,
};