import {EMAIL, PASSWORD, LOGIN, DESCRIPTION, CATEGORY} from "./constants.js";

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
  if (cookieItems.length) {
    return cookieItems[0].slice(section.length + 1).split(",");
  } else {
    return cookieItems;
  }
};

const addCookie = (id, section) => {
  let like = userCookie(section);
  if (like.length) {
    if (like.every(item => item !== id.toString())) {
      like = [...like, id.toString()];
      document.cookie = `${section}${like.join(",")};path=/`;
    }
  } else {
    document.cookie = `${section}${id}`;
  }
};

const deleteCookie = (id, section) => {
  let like = userCookie(section);
  document.cookie = `${section}${like.filter(item => item !== id.toString())}`;
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
  deleteCookie
};