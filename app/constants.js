const USER = "pkuryla";
const PASS = "hcarfnblkzgbehrs"
const URL = "https://sarafan-server1.onrender.com";
// const FrontendURL = "https://sarafan.onrender.com";
// const URL = "http://localhost:7780";
const FrontendURL = "http://localhost:3000";
const SALT = "1afadvf0bjda2bmad4bo1fbd2bl";
const COUNT_ITEMS = 10;
const EMAIL = {
  minLength: 3,
  maxLength: 256,
  regex: function () {
    return new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\"]" +
      "+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}" +
      "\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", "i");
  }
};
const PASSWORD = {
  minLength: 6,
  maxLength: 256,
  symbols: "! # $ % & ' * + - / = ? ^ _  { | } ~",
  regex: function () {
    return new RegExp("^[-/=!#$%&'*+?^_`{|}~.A-Z0-9]{" +
      this.minLength + "," + this.maxLength + "}$", "i");
  }
};
const LOGIN = {
  minSymbols: 3,
  maxSymbols: 50,
  regex: function () {
    return new RegExp("^[ a-z0-9а-я]{" +
      this.minSymbols + "," + this.maxSymbols + "}$", "i");
  }
};

const DESCRIPTION = {
  minSymbols: 1,
  maxSymbols: 300,
  regex: function () {
    return new RegExp("^[\"\\[\\]\\s-:)(/=!#$%&'*+?^_`{|}~.,<>@A-Z0-9А-Я]{" +
      this.minSymbols + "," + this.maxSymbols + "}$", "i");
  }
};

const CATEGORY = {
  minSymbols: 1,
  maxSymbols: 50,
  regex: function () {
    return new RegExp("^[- a-z0-9а-я]{" +
      this.minSymbols + "," + this.maxSymbols + "}$", "i");
  }
};

const timeAuthorization = 3 * 60 * 60 * 60 * 60;

export {URL,FrontendURL, SALT, COUNT_ITEMS, EMAIL, PASSWORD, USER, PASS, timeAuthorization, LOGIN, DESCRIPTION, CATEGORY};
