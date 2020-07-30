const db = require("../../data/config");

async function add(student) {
    const [id] = await db("students").insert(student);
    return findById(id);
}

function find() {
    return db("students").select("id", "email");
}

function findBy(filter) {
    return db("students")
        .select("id", "name", "cohort", "email", "password")
        .where(filter);
}

function findById(id) {
    return db("students")
        .select("id", "name", "cohort", "email")
        .where({ id })
        .first();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
};
