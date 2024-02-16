const Menu = [
  {title: "Новинки", path: "/new"},
  {title: "Одежда", path: "/categories"},
  {title: "Аксессуары", path: "/accessories"},
  {title: "SALE", path: "/sale"}
];

const SelectData = [
  {value: "new", name: "Новинки"},
  {value: "increase", name: "По возрастанию цены"},
  {value: "decrease", name: "По убыванию цены"},
];

const Delivery =
  {
    title: "Доставка",
    content: [
      {
        title: "Отправка",
        text: "Идейные соображения высшего порядка, а также укрепление и развитие структуры позволяет выполнять важные" +
          " задания по разработке системы обучения кадров, соответствует насущным потребностям. Таким образом начало" +
          " повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации позиций, " +
          "занимаемых участниками в отношении поставленных задач."
      },
      {
        title: "Доставка",
        text: "Идейные соображения высшего порядка, а также укрепление и развитие структуры позволяет выполнять важные" +
          " задания по разработке системы обучения кадров, соответствует насущным потребностям. Таким образом начало " +
          "повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации позиций, " +
          "занимаемых участниками в отношении поставленных задач. Таким образом начало повседневной работы по " +
          "формированию позиции влечет за собой процесс внедрения и модернизации позиций, занимаемых участниками в " +
          "отношении поставленных задач."
      }]
  }
const ReturnAndExchange = {
  title: "Возврат и обмен",
  content: [{
    title: "Возврат",
    text: "Идейные соображения высшего порядка, а также укрепление и развитие структуры позволяет выполнять важные " +
      "задания по разработке системы обучения кадров, соответствует насущным потребностям. Таким образом начало " +
      "повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации позиций, " +
      "занимаемых участниками в отношении поставленных задач."
  }, {
    title: "Обмен",
    text: "Идейные соображения высшего порядка, а также укрепление и развитие структуры позволяет выполнять важные " +
      "задания по разработке системы обучения кадров, соответствует насущным потребностям. Таким образом начало " +
      "повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации позиций, " +
      "занимаемых участниками в отношении поставленных задач."
  }]
};
const DataHelp = [
  {title:"Оплата", value:"payment"},
  {title:"Доставка", value:"delivery"},
  {title:"Возврат и обмен", value:"exchange"},
]
const Company = [
  {title: "О нас", path: "/about_us"},
  {title: "Наши магазины", path: "/shops"},
  {title: "Контакты", path: "/contacts"}
];

const Media = [
  {title: "Tik tok", path: "/"},
  {title: "Vk", path: "/"},
  {title: "Telegram", path: "/"},
  {title: "Instagram", path: "/"}
];

const chooseDelivery = [
  {point: "Самовывоз", value: "Бесплатно", choice: 0},
  {point: "Доставка курьером", value: "от 300 руб.", choice: 300},
  {point: "Доставка курьером СДЭК", value: "от 300 руб.", choice: 300},
  {point: "Самовывоз СДЭК", value: "от 200 руб.", choice: 200},
  {point: "Почта", value: "от 200 руб.", choice: 200},
];

const choosePayment = [
  {point: "Online оплата картой", choice: "online"},
  {point: "Оплата наличными при получении", choice: "cash"}
];

export {
  Menu,
  SelectData,
  Delivery,
  ReturnAndExchange,
  DataHelp,
  Company,
  Media,
  chooseDelivery,
  choosePayment,
};