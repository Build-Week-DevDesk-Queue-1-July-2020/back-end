// pre-hashed password for "abc12345"
const hashedPassword =
    "$2a$14$qHqCbXUImiBOgXlFNX47wuA7uFWNGNAZutYLvOeye9eotewGlfYV6";

exports.seed = async function (knex) {
    await knex("students").insert([
        {
            name: "janedoe",
            cohort: "pt-14",
            email: "janedoe@me.com",
            password: hashedPassword,
        },
        {
            name: "johndoe",
            cohort: "pt-14",
            email: "johndoe@me.com",
            password: hashedPassword,
        },
    ]);
};
