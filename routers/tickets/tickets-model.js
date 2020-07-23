const db = require("../../data/config");

async function add(ticket) {
    const [id] = await db("tickets").insert(ticket);
    return findById(id);
}

function find() {
    return db("tickets").select("*");
}

function findBy(filter) {
    return db("tickets").select("*").where(filter);
}

function findById(id) {
    return db("tickets").select("*").where({ id }).first();
}

function update(changes, id) {
    return db("tickets").where("id", id).update(changes);
}

function remove(id) {
    return db("tickets").where("id", id).del();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
};
