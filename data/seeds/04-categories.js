exports.seed = async function (knex) {
    await knex("categories").insert([
        {
            id: 0,
            name: "Uncategorized",
        },
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
