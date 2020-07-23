exports.seed = async function (knex) {
    await knex("categories").insert([
        {
            name: "React",
        },
        {
            name: "Express",
        },
        {
            name: "Nodejs",
        },
    ]);
};
