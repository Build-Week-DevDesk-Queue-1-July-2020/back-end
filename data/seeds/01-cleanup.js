exports.seed = async function (knex) {
    await knex("tickets").truncate();
    await knex("helpers").truncate();
    await knex("students").truncate();
};
