import {useTranslations} from "next-intl";

const Menu = () => {
  const data = useTranslations("DataMenu");
  return [
    {title: data("title1"), path: "/new"},
    {title: data("title2"), path: "/categories"},
    {title: data("title3"), path: "/accessories"},
    {title: data("title4"), path: "/sale"}
  ];
};

const DataLanguage = () => {
  const data = useTranslations("DataLanguage");
  return {
    title: data("title"),
    list: [
      {name: data("name1"), value: "en"},
      {name: data("name2"), value: "ru"},
      {name: data("name3"), value: "pl"}
    ]
  };
};

const SelectData = () => {
  const data = useTranslations("SelectData");
  return [
    {value: "new", name: data("name1")},
    {value: "increase", name: data("name2")},
    {value: "decrease", name: data("name3")},
  ];
};

const Delivery = () => {
  const data = useTranslations("DataDelivery");
  return {
    title: data("title"),
    content: [
      {
        title: data("subTitle1"),
        text: data("text1")
      },
      {
        title: data("subTitle2"),
        text: data("text2")
      }]
  };
};

const ReturnAndExchange = () => {
  const data = useTranslations("DataReturnAndExchange");
  return {
    title: data("title"),
    content: [{
      title: data("subTitle1"),
      text: data("text1")
    }, {
      title: data("subTitle2"),
      text: data("text2")
    }]
  };
};

const DataHelp = () => {
  const data = useTranslations("DataHelp");
  return {
    title: data("title"),
    list: [
      {title: data("title1"), value: "payment"},
      {title: data("title2"), value: "delivery"},
      {title: data("title3"), value: "exchange"},
    ]
  };
};

const Company = () => {
  const data = useTranslations("DataCompany");
  return {
    title: data("title"),
    list: [
      {title: data("title1"), path: "/about_us"},
      {title: data("title2"), path: "/shops"},
      {title: data("title3"), path: "/contacts"}
    ]
  };
};

const Media = () => {
  const data = useTranslations("DataMedia");
  return {
    title: data("title"),
    list: [
      {title: "Tik tok", path: "/"},
      {title: "Vk", path: "/"},
      {title: "Telegram", path: "/"},
      {title: "Instagram", path: "/"}
    ]
  };
};

const ChooseDelivery = () => {
  const data = useTranslations("DataChooseDelivery");
  const global = useTranslations("Global");
  return [
    {point: data("point1"), value: data("value1"), choice: 0},
    {point: data("point2"), value: `${data("prep")} 300 ${global("cash")}`, choice: 300},
    {point: data("point3"), value: `${data("prep")} 300 ${global("cash")}`, choice: 300},
    {point: data("point4"), value: `${data("prep")} 200 ${global("cash")}`, choice: 200},
    {point: data("point5"), value: `${data("prep")} 200 ${global("cash")}`, choice: 200},
  ];
};

const ChoosePayment = () => {
  const data = useTranslations("DataChoosePayment");
  return [
    {point: data("point1"), choice: "online"},
    {point: data("point2"), choice: "cash"}
  ];
};

const DataIcons = () => {
  const data = useTranslations("DataIcons");
  return {
    like: data("like"),
    cart: data("cart"),
    login: data("login"),
    personalData: data("personalData")
  };
};

const DataMyCart = (value?: string) => {
  const data = useTranslations("MyCart");
  return {
    rule: data("rule", {payment: value}),
  };
};

const DataCard = () => {
  const data = useTranslations("DataCard");
  const global = useTranslations("Global");
  return {
    addLike: data("addLike"),
    removeLike: data("removeLike"),
    cash: global("cash")
  };
};

const DataCart = () => {
  const data = useTranslations("DataCart");
  const global = useTranslations("Global");
  return {
    title: data("title"),
    cost: global("cost"),
    cash: global("cash"),
    count: global("count"),
    color: global("color"),
    size: global("size"),
    delete: global("delete"),
    button: data("button"),
  };
};

const DataMainInform = () => {
  const data = useTranslations("MainInform");
  return {
    title: data("title"),
    description: data("description"),
    about: data("about")
  };
};

const DataButton = () => {
  const data = useTranslations("Global");
  return {
    yes: data("yes"),
    ok: data("ok"),
    no: data("no")
  };
};

const DataPersonalMenu = () => {
  const data = useTranslations("PersonalMenu");
  return {
    mainInform: data("mainInform"),
    myOrders: data("myOrders"),
    exit: data("exit")
  };
};

const DataSlides = () => {
  const data = useTranslations("Slides");
  return {
    inform: data("inform"),
    title: data("title"),
    button: data("button")
  };
};

const DataHelpMessage = () => {
  const data = useTranslations("Global");
  const titleModal: string = data("deleteItem");
  return {title:titleModal};
};

export {
  Menu,
  DataLanguage,
  SelectData,
  Delivery,
  ReturnAndExchange,
  DataHelp,
  Company,
  Media,
  ChooseDelivery,
  ChoosePayment,
  DataIcons,
  DataMyCart,
  DataCard,
  DataCart,
  DataMainInform,
  DataButton,
  DataPersonalMenu,
  DataSlides,
  DataHelpMessage
};