exports.seed = async function (knex) {
    await knex("helpers").truncate();
    await knex("students").truncate();
};
