exports.seed = async function (knex) {
    await knex("tickets").insert([
        {
            student_id: 1,
            title: "Image test",
            description: "cannot resize test",
            what_ive_tried: "lorem ipsum test",
            category: "react",
            helper_id: 0,
            status: "open",
        },
        {
            student_id: 1,
            title: "React styled components",
            description: "not styling divs",
            what_ive_tried: "inline styles",
            category: "nodejs",
            helper_id: 0,
            status: "open",
        },
        {
            student_id: 2,
            title: "React routes",
            description: "keep getting 500",
            what_ive_tried: "install packages, rename routes",
            category: "javascript",
            helper_id: 0,
            status: "open",
        },
    ]);
};
