const db = require("../../data/config");

async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
}

function find() {
    return db("users").select("id", "username");
}

function findBy(filter) {
    return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
    return db("users").select("id", "username").where({ id }).first();
}

function findByDept(dept) {
    return db("users").select("id", "username").where({ department: dept });
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByDept,
};
