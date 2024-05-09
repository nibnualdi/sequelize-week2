const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const { Users, Profiles } = require("../db/models");

// 1
// menyimpan 5 data users sekaligus
const generateUsers = async () => {
  const user = [];

  for (let index = 0; index < 5; index++) {
    user.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password(), 10),
    });
  }
  return user;
};

const createUser = async (_, res) => {
  const users = await Users.bulkCreate(await generateUsers());
  res.json({ results: users });
};

// 2
// jumlah data di tabel user
const getNumRowUser = async (_, res) => {
  const users = await Users.count();
  res.json({
    num_row: users,
  });
};

// 3
// pagination
const paginateUsers = async (req, res) => {
  const page = req.body.page || 1;
  const limit = req.body.limit || 2;
  const offset = (page - 1) * limit;
  const { count, rows } = await Users.findAndCountAll({ limit, offset });

  res.json({
    results: rows,
    pagination: {
      num_row: count,
      totalPage: Math.ceil(count / limit),
      page,
    },
  });
};

// 4
// relasi users, profiles (LEFT JOIN, INNER JOIN, RIGHT JOIN)
const getAllDetailUsers = async (req, res) => {
  const join = req.body.join || "INNER";

  // LEFT JOIN
  if (join === "LEFT") {
    const users = await Users.findAll({
      include: [
        {
          model: Profiles,
          required: false,
        },
      ],
    });

    return res.json(users);
  }

  // INNER JOIN
  if (join === "INNER") {
    const users = await Users.findAll({
      include: [
        {
          model: Profiles,
          required: true,
        },
      ],
    });

    return res.json(users);
  }

  // RIGHT JOIN
  if (join === "RIGHT") {
    const users = await Users.findAll({
      include: [
        {
          model: Profiles,
          right: true,
        },
      ],
    });

    return res.json(users);
  }
};

module.exports = { createUser, getNumRowUser, paginateUsers, getAllDetailUsers };
