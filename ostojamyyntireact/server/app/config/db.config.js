module.exports = {
    HOST: "ec2-13-51-197-128.eu-north-1.compute.amazonaws.com",
    USER: "root",
    PASSWORD: "my-new-password",
    DB: "myTable",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };