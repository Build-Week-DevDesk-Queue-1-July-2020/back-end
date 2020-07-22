// pre-hashed password for "abc12345"
const hashedPassword =
    "$2a$14$qHqCbXUImiBOgXlFNX47wuA7uFWNGNAZutYLvOeye9eotewGlfYV6";

exports.seed = async function (knex) {
    await knex("helpers").insert([
        {
            name: "helper1",
            email: "helper1@me.com",
            password: hashedPassword,
        },
        {
            name: "helper2",
            email: "helper1@me.com",
            password: hashedPassword,
        },
    ]);
};
