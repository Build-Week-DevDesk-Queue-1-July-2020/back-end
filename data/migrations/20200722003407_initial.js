exports.up = async function (knex) {
    await knex.schema.createTable("students", (table) => {
        table.increments();
        table.text("name").notNull();
        table.text("cohort").notNull();
        table.text("email").notNull().unique();
        table.text("password").notNull();
    });

    await knex.schema.createTable("helpers", (table) => {
        table.increments();
        table.text("name").notNull();
        table.text("email").notNull().unique();
        table.text("password").notNull();
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("helpers");
    await knex.schema.dropTableIfExists("students");
};
