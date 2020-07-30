const db = require("../../data/config");

async function add(helper) {
    const [id] = await db("helpers").insert(helper);
    return findById(id);
}

function find() {
    return db("helpers").select("id", "email");
}

function findBy(filter) {
    return db("helpers")
        .select("id", "name", "email", "password")
        .where(filter);
}

function findById(id) {
    return db("helpers").select("id", "name", "email").where({ id }).first();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
};
