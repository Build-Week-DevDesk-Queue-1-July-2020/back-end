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

    await knex.schema.createTable("categories", (table) => {
        table.increments();
        table.text("name").notNull().unique();
    });

    await knex.schema.createTable("tickets", (table) => {
        table.increments();
        table.text("title").notNull();
        table.text("description").notNull();
        table.text("what_ive_tried").notNull();
        table
            .integer("category_id")
            .notNull()
            .references("id")
            .inTable("categories")
            .onDelete("SET NULL")
            .onUpdate("CASCADE");
        table
            .integer("student_id")
            .notNull()
            .references("id")
            .inTable("students")
            .onDelete("SET NULL")
            .onUpdate("CASCADE");
        table
            .integer("helper_id")
            .notNull()
            .references("id")
            .inTable("helpers")
            .onDelete("SET NULL")
            .onUpdate("CASCADE");
        table.text("status").notNull();
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("tickets");
    await knex.schema.dropTableIfExists("categories");
    await knex.schema.dropTableIfExists("helpers");
    await knex.schema.dropTableIfExists("students");
};
