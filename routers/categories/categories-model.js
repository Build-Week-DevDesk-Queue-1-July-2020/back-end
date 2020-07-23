const db = require("../../data/config");

async function add(category) {
    const [id] = await db("categories").insert(category);
    return findById(id);
}

function find() {
    return db("categories").select("*");
}

function findBy(filter) {
    return db("categories").select("*").where(filter);
}

function findById(id) {
    return db("categories").select("*").where({ id }).first();
}

function update(changes, id) {
    return db("categories").where("id", id).update(changes);
}

function remove(id) {
    return db("categories").where("id", id).del();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
};
