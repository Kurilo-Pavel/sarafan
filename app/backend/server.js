import express from "express";
import path, {dirname} from "path";
import progress from "progress-stream";
import multer from "multer";
import {fileURLToPath} from "url";
import {sha256} from "js-sha256";
import {SALT, USER, PASS, timeAuthorization, URL, COUNT_ITEMS, FrontendURL} from "../constants.js";
import {emailCheck, passwordCheck} from "../script.js";
import pg from 'pg';
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import generatePassword from "generate-password";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = express();
const port = 7780;

const configPG = {
  user: "pavel",
  password: "CgZ69UnjWTApdXUSfyyKaBs90VhL9m47",
  host: "dpg-cm7hkced3nmc73cgj2vg-a.frankfurt-postgres.render.com",
  port: 5432,
  database: "sarafanshop",
  ssl: true
};
const configNodeMailer = {
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: USER,
    pass: PASS
  }
};
const storageConfig = multer.diskStorage({
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, file.originalname);
  },
  fileFilter: function (req, file, cb) {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];
    if (fileType === "jpg" || fileType === "png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  destination: path.join(__dirname, "../../public/png/big"),
});

const upload = multer({
  storage: storageConfig,
});
const saveFile = upload.fields([{name: "images", maxCount: 5}]);

server.options('/*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");
  res.send("");
});

server.use(cookieParser());

server.use(express.static(__dirname));
server.use(express.urlencoded({extended: true}));


server.post("/log", express.json({type: "*/*"}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);
  const email = request.body.email;
  let password = request.body.password;
  const date = new Date().getTime();
  if (!emailCheck(email)) {
    response.status(401).send({error: "Incorrect email"});
  } else if (!passwordCheck(password)) {
    response.status(401).send({error: "Incorrect password"});
  } else {
    password = sha256.hmac(password, SALT);
    const connection = new pg.Client(configPG);
    connection.connect(err => {
      if (err) {
        console.log("not connect with bd", err);
      } else {
        connection.query(`select * from sessions where id=(select id from users where email='${email}' and password='${password}')`, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            if (results.rows.length === 0) {
              response.status(401).send({error: "wrong email or password"});
              connection.end();
            } else {
              const dataUser = results.rows[0];
              if (dataUser.aut) {
                jwt.sign({
                  id: dataUser.id,
                  email: dataUser.email,
                  admin: dataUser.admin,
                }, SALT, (err, token) => {
                  if (err) {
                    console.log("token error", err);
                  } else {
                    connection.query(`update sessions set token = '${token}' where id = ${dataUser.id}`, err => {
                      if (err) {
                        console.log("unable to refresh token");
                        connection.end();
                      } else {
                        response.send({user: {id: dataUser.id, email: dataUser.email, token: token}});
                        connection.end();
                      }
                    });
                  }
                });
              } else {
                if (date - dataUser.created > timeAuthorization) {
                  connection.query(`delete from sessions where id=${dataUser.id}`, err => {
                    if (err) {
                      console.log("cannot delete the session");
                    } else {
                      connection.query(`delete from users where id=${dataUser.id}`, err => {
                        if (err) {
                          console.log("cannot delete the user");
                        } else {
                          response.send({message: "Токен истек, вам необходимо повторить регистрацию"});
                          connection.end();
                        }
                      });

                    }
                  });
                } else {
                  response.send({message: `Проверьте свою почту: ${dataUser.email}`});
                }

              }
            }
          }
        });
      }
    });
  }
});

server.post("/reg", express.json({type: "*/*"}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);

  let password = request.body.password;
  const repPassword = request.body.repPassword;
  const dataUser = {
    email: request.body.email,
    admin: false
  }
  const rules = request.body.rules;
  const date = new Date().getTime();

  if (!emailCheck(dataUser.email)) {
    response.status(401).send({error: "Incorrect email"});
  } else if (!passwordCheck(password) || repPassword !== password) {
    response.status(401).send({error: "Incorrect password"});
  } else if (!rules) {
    response.send({error: "you must agree to the rules"});
  } else {
    password = sha256.hmac(request.body.password, SALT);
    const connection = new pg.Client(configPG);
    connection.connect(err => {
      if (err) {
        console.log("not connect with bd", err);
      } else {
        connection.query(`select email from users where email = '${dataUser.email}'`, (err, results) => {
          if (err) {
            console.log(err);
          } else if (results.rows.length) {
            response.status(401).send({error: "choose another email"});
          } else {
            connection.query(`select max(id) from users`, (err, results) => {
              if (err) {
                console.log(err);
              } else {
                for (let key in results.rows[0]) {
                  if (!results.rows[0][key]) {
                    dataUser.id = 1;
                  } else {
                    dataUser.id = results.rows[0][key] + 1;
                  }
                }
                const transporter = nodemailer.createTransport(configNodeMailer);
                jwt.sign(dataUser, SALT, (err, token) => {
                  if (err) {
                    console.log("token error", err);
                  } else {

                    const message = {
                      from: "pkuryla@yandex.ru",
                      to: [dataUser.email],
                      subject: "Confirm email",
                      html: `<a href="${URL}/check?token=${token}">Click me</a>`
                    };

                    transporter.sendMail(message, err => {
                      if (err) {
                        console.log("sendEmail - error", err);
                        response.status(401).send({error: "sorry we couldn't send the email"});
                        connection.end();
                      } else {
                        connection.query(`insert into users (id, email, password) values (${dataUser.id}, '${dataUser.email}', '${password}')`, err => {
                            if (err) {
                              console.log("err in add new user");
                            } else {
                              connection.query(`insert into sessions (id, created, token, email, aut, admin) values (${dataUser.id}, '${date}', '${token}', '${dataUser.email}', false, ${dataUser.admin})`, err => {
                                if (err) {
                                  console.log("err in add new sessions", err);
                                } else {
                                  response.send({message: `Зайдите на почту: ${dataUser.email} и авторизируйтесь`});
                                  connection.end();
                                }
                              });
                            }
                          }
                        );
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

server.get("/check", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);

  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      console.log("not connect with bd", err);
    } else {
      connection.query(`select token from sessions where token='${request.query.token}'`, (err, results) => {
        if (err) {
          console.log("Error check token", err);
        } else {
          if (!results.rows.length) {
            connection.end();
            response.send({error: "bad token"});
          } else {
            connection.query(`update sessions set aut=true where token='${request.query.token}'`, err => {
              if (err) {
                console.log("update aut error");
                connection.end();
              } else {
                connection.end();
                response.redirect(302, `${FrontendURL}/log`);
              }
            });
          }
        }
      });
    }
  });
});

server.post("/updatePassword", express.json({type: "*/*"}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);
  const email = request.body.email;
  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      response.status(500).send({error: "not connection with bd"});
      console.log("not connection with bd", err);
    } else {
      const checkMail = new Promise((resolve, reject) => {
        connection.query(`select email from users where email='${email}'`, (err, result) => {
          if (err) {
            connection.end();
          } else {
            if (result.rows.length >= 1) {
              const password = generatePassword.generate({
                length: 10,
                numbers: true,
                lowercase: true
              });
              const userPassword = sha256.hmac(password, SALT);
              connection.query(`update users set password='${userPassword}' where email='${email}'`, err => {
                if (err) {
                  console.log("error: password is not changed");
                  reject(err);
                } else {
                  const transporter = nodemailer.createTransport(configNodeMailer);
                  const message = {
                    from: "pkuryla@yandex.ru",
                    to: [email],
                    subject: "New password",
                    html: `<div><b>Password: </b><span>${password}</span><br/>
                      <a href='${FrontendURL}/log'>Click me</a></div>`
                  };
                  transporter.sendMail(message, err => {
                    if (err) {
                      console.log("password not sent by email", err);
                      connection.end();
                      response.status(401).send({error: "sorry it's bug"});
                    } else {
                      connection.end();
                      response.send({message: `Новый пароль отправлен на ${email}`});
                    }
                  });
                }
              });

            } else {
              response.send({error: "Email не найден"});
            }
          }
        });
      });
      checkMail.then(() => {
        connection.end()
      });
    }
  });
});

server.get("/categories", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);
  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      console.log("not connect with bd in categories");
      connection.end();
    } else {
      connection.query(`select name_category from category`, (err, results) => {
        if (err) {
          console.log("didn't get categories", err);
        } else {
          response.send({categories: results.rows});
          connection.end();
        }
      });
    }
  });
});

server.get("/clothes/:categories/:page", express.json({type: "*/*"}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);

  const countItems = (request.params.page - 1) * COUNT_ITEMS;

  const connection = new pg.Client(configPG);

  connection.connect(err => {
    if (err) {
      console.log("not connect with bd", err);
    } else {
      const allProducts = new Promise((resolve, eject) => {
        connection.query(`select * from clothes where category='${request.params.categories}' ${countItems ? 'limit ' + countItems + ', ' + COUNT_ITEMS : ''}`, async (err, result) => {
          if (err) {
            console.log(err);
          } else {
            resolve(result.rows);
          }
        });
      });

      allProducts.then(async (data) => {
        response.send({products: data});
      });

    }
  });
});

server.post("/category/add/:categories", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);

  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      console.log("not connection with bd", err);
    } else {
      connection.query(`insert into category (name_category) values ('${request.params.categories}')`, err => {
        if (err) {
          console.log(err);
        } else {
          connection.query(`select * from category`, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              response.send({categories: result.rows});
              connection.end();
            }
          });
        }
      });
    }
  });
});

server.delete("/category/delete/:categories", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);
  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      console.log("not connection with bd", err);
    } else {
      connection.query(`delete from category where name_category='${request.params.categories}'`, err => {
        if (err) {
          console.log(err);
        } else {
          connection.query(`select * from category`, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              response.send({categories: result.rows});
              connection.end();
            }
          });
        }
      });
    }
  });
});

server.post("/category/clothes/sort:sort?category:category?page:page", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);

  let type;
  let countItems = (request.params.page - 1) * COUNT_ITEMS;
  let category = request.params.category;

  switch (request.params.sort) {
    case "new":
      type = "date";
      break;
    case "increase":
      type = "price";
      break;
    case "decrease":
      type = "price desc";
      break;
    default:
      break;
  }
  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      console.log("not connect with bd", err);
    } else {
      connection.query(`select * from clothes where category='${category}' order by ${type} ${countItems ? 'limit ' + countItems + ', ' + COUNT_ITEMS : ''}`, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          response.send({products: results.rows});
          connection.end();
        }
      });
    }
  });
});

server.post("/category/clothes/addProduct", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Headers", "Authorization");

  const date = new Date().getTime();
  const token = request.headers.authorization;
  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      response.status(500).send({error: "not connection with bd"});
      console.log("not connection with bd", err);
    } else {
      const checkToken = new Promise((resolve, reject) => {
        connection.query(`select * from sessions where token='${token}'`, (err, result) => {
          if (err) {
            console.log(err);
            reject({error: "error"});
          } else {
            if (!result.rows.length) {
              reject({error: "bad token"});
            } else {
              resolve(result.rows);
            }
          }
        });
      });
      checkToken.then(() => {
        const loadProgress = progress();
        loadProgress.headers = request.headers;
        request.pipe(loadProgress);

        request.on("data", () => {
        });
        saveFile(loadProgress, response, async (err) => {
          if (err) {
            response.status(500).send({error: err});
          } else {

            const getId = new Promise((resolve, reject) => {
              connection.query(`select max(id) from clothes`, (err, result) => {
                if (err) {
                  reject({error: err});
                } else {
                  resolve(result.rows);
                }
              });
            });

            getId.then(maxId => {
              const newId = maxId[0].max + 1;

              const addClothe = new Promise((resolve, reject) => {
                connection.query(`insert into clothes (id, category, name, price, date, sale, description, main_img, sub_img)
 values (${newId},'${loadProgress.body.category}','${loadProgress.body.name}',${loadProgress.body.price},'${date}',${loadProgress.body.sale},'${loadProgress.body.description}','${loadProgress.body.main_img}','${loadProgress.body.sub_img}')`, (err, result) => {
                  if (err) {
                    reject({error: err});
                  } else {
                    resolve();
                  }
                });
              });

              const addSize = new Promise((resolve, reject) => {
                JSON.parse(loadProgress.body.size).map(size => {
                  connection.query(`insert into size (id,size ) values (${newId},'${size}')`, err => {
                    if (err) {
                      reject({error: err})
                    } else {
                      resolve();
                    }
                  });
                });
              });

              const addColor = new Promise((resolve, reject) => {
                JSON.parse(loadProgress.body.color).map(color => {
                  connection.query(`insert into colors (id,color) values (${newId},'${color}')`, err => {
                    if (err) {
                      reject({error: err});
                    } else {
                      resolve();
                    }
                  });
                });
              });

              Promise.all([addClothe, addColor, addSize]).then(() => {
                connection.query(`select * from clothes where category='${loadProgress.body.category}'`, (err, result) => {
                  if (err) {
                    connection.end();
                    response.status(500).send(err);
                  } else {
                    response.send({products: result.rows});
                    connection.end();
                  }
                });
              }).catch(error => {
                connection.end();
                response.status(500).send(error);
              })
            });
          }
        });
      }, error => {
        connection.end();
        response.status(500).send(error);
      });
    }
  })
});

server.get("/item/:id", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);
  const id = request.params.id;

  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      response.status(500).send({error: "not connection with bd"});
      console.log("not connection with bd", err);
    } else {

      const dataItem = new Promise((resolve, reject) => {
        connection.query(`select * from clothes where id=${id}`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
        });
      });

      const colors = new Promise((resolve, reject) => {
        connection.query(`select color from colors where id=${id}`, (err, result) => {
          if (err) {
            console.log("colors error");
            reject(err);
          } else {
            resolve(result.rows.map(data => data.color));
          }
        });
      });

      const sizes = new Promise((resolve, reject) => {
        connection.query(`select size from size where id=${id}`, (err, result) => {
          if (err) {
            console.log("sizes error");
            reject(err);
          } else {
            resolve(result.rows.map(data => data.size));
          }
        });
      });

      dataItem.then(data => {
        const dataItem = data[0];
        colors.then(color => {
          sizes.then(size => {
            dataItem.colors = color;
            dataItem.sizes = size;
            response.send({product: dataItem});
            connection.end();
          });
        });
      }).catch(error => {
        response.status(500).send({error: error});
        connection.end();
      });
    }
  });
});

server.get("/items/:page", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);

  const countItems = (request.params.page - 1) * COUNT_ITEMS;
  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      response.status(500).send({error: "not connection with bd"});
      console.log("not connection with bd items", err);
    } else {
      const items = new Promise((resolve, reject) => {
        connection.query(`select * from clothes ${countItems ? 'limit ' + countItems + ' ,' + COUNT_ITEMS : ''}`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
        });
      });
      items.then(data => {
        response.send({products: data});
        connection.end();
      });
    }
  });
});

server.get("/newItems/:page", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);

  const countItems = (request.params.page - 1) * COUNT_ITEMS;

  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      response.status(500).send({error: "not connection with bd"});
      console.log("not connection with bd newItems", err);
    } else {
      const newItems = new Promise((resolve, reject) => {
        connection.query(`select * from clothes order by date ${countItems ? 'limit ' + countItems + ', ' + COUNT_ITEMS : ''}`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
        });
      });
      newItems.then(items => {
        response.send({products: items});
        connection.end();
      })
    }
  });
});


server.get("/sale/:page", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", `${FrontendURL}`);

  const countItems = (request.params.page - 1) * COUNT_ITEMS;

  const connection = new pg.Client(configPG);
  connection.connect(err => {
    if (err) {
      response.status(500).send({error: "not connection with bd"});
      console.log("not connection with bd sale", err);
    } else {
      const items = new Promise((resolve, reject) => {
        connection.query(`select * from clothes where sale>0 ${countItems ? 'limit ' + countItems + ',' + COUNT_ITEMS : ''}`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
        });
      });
      items.then(items => {
        response.send({products: items});
        connection.end();
      });
    }
  });
});

server.listen(port, () => {
  console.log("server working...");
});