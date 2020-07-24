const db = require("../../data/config");

async function add(ticket) {
    const [id] = await db("tickets").insert(ticket);
    return findById(id);
}

function find() {
    return db("tickets").select("*");
}

function findBy(filter) {
    return db("tickets as t")
        .join("categories as c", "c.id", "t.category_id")
        .leftJoin("helpers as h", "h.id", "t.helper_id")
        .leftJoin("students as s", "s.id", "t.student_id")
        .select(
            "t.id",
            "t.title",
            "t.description",
            "t.what_ive_tried",
            "t.what_ive_tried",
            "c.name as category_name",
            "s.name as by_student",
            "h.name as helper_name",
            "t.status"
        )
        .where(filter);
}

function findById(id) {
    return db("tickets").select("*").where({ id }).first();
}

async function findByIdParam(id) {
    return await db("tickets as t")
        .join("categories as c", "c.id", "t.category_id")
        .leftJoin("helpers as h", "h.id", "t.helper_id")
        .leftJoin("students as s", "s.id", "t.student_id")
        .select(
            "t.id",
            "t.title",
            "t.description",
            "t.what_ive_tried",
            "t.what_ive_tried",
            "c.name as category_name",
            "s.name as by_student",
            "h.name as helper_name",
            "t.status"
        )
        .where({ "t.id": id });
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
    findByIdParam,
    update,
    remove,
};
