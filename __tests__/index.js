const supertest = require("supertest");
const server = require("../index");
const db = require("../data/config");

// a global jest hook to run before each individual test
beforeEach(async () => {
    // re-run the seeds and start with a fresh database for each test
    await db.seed.run();

    const user = {
        name: "jack doe",
        cohort: "pt-14",
        email: "jackdoe1@me.com",
        password: "abcd12345",
    };

    await supertest(server).post("/auth/students/register").send(user);
});

// a global jest hook to run after all the tests are done
afterAll(async () => {
    // closes the database connection so the jest command doesn't stall
    await db.destroy();
});

describe("students endpoints", () => {
    it("POST register", async () => {
        const res = await supertest(server)
            .post("/auth/students/register")
            .send({
                name: "jack doe",
                cohort: "pt-14",
                email: "jackdoe2@me.com",
                password: "abcd12345",
            });
        expect(res.statusCode).toBe(201);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body.message).toBe("Successfully added new student.");
    });

    it("POST login", async () => {
        const res = await supertest(server).post("/auth/students/login").send({
            email: "jackdoe1@me.com",
            password: "abcd12345",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Welcome jack doe!");
        expect(res.body.token).toBeDefined();
    });

    it("GET tickets by student id", async () => {
        const log = await supertest(server).post("/auth/students/login").send({
            email: "jackdoe1@me.com",
            password: "abcd12345",
        });

        const res = await supertest(server)
            .get("/students/1/tickets")
            .set("Authorization", log.body.token);

        expect(res.statusCode).toBe(200);
    }, 30000);

    it("GET tickets by student id and ticket id", async () => {
        const log = await supertest(server).post("/auth/students/login").send({
            email: "jackdoe1@me.com",
            password: "abcd12345",
        });

        const res = await supertest(server)
            .get("/students/1/tickets/2")
            .set("Authorization", log.body.token);
        // console.log("res", res.body);
        expect(res.statusCode).toBe(200);
    });

    it("POST tickets by student id", async () => {
        const log = await supertest(server).post("/auth/students/login").send({
            email: "jackdoe1@me.com",
            password: "abcd12345",
        });

        const res = await supertest(server)
            .post("/students/2/tickets")
            .send({
                title: "POST Bacon loprem dolor",
                description: "cannot resize test",
                what_ive_tried: "lorem ipsum test",
                category: "reactjs",
            })
            .set("Authorization", log.body.token);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Successfully added new ticket.");
    });

    it("PUT tickets by student id", async () => {
        const log = await supertest(server).post("/auth/students/login").send({
            email: "jackdoe1@me.com",
            password: "abcd12345",
        });

        const res = await supertest(server)
            .put("/students/2/tickets/1")
            .send({
                title: "UPDATE Bacon loprem dolor",
                description: "UPDATE cannot resize test",
                what_ive_tried: "UPDATE lorem ipsum test",
                category: "reactjs",
            })
            .set("Authorization", log.body.token);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Successfully updated ticket.");
    });

    // it("DELETE tickets by student id", async () => {
    //     const log = await supertest(server).post("/auth/students/login").send({
    //         email: "jackdoe1@me.com",
    //         password: "abcd12345",
    //     });

    //     const post = await supertest(server)
    //         .post("/students/2/tickets")
    //         .send({
    //             title: "Bacon loprem dolor",
    //             description: "cannot resize test",
    //             what_ive_tried: "lorem ipsum test",
    //             category: "reactjs",
    //         })
    //         .set("Authorization", log.body.token);

    //     expect(post.statusCode).toBe(201);

    //     const res = await supertest(server).delete("/students/2/tickets/4");
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.message).toBe("Successfully deleted ticket.");
    // });
});

describe("helpers endpoints", () => {
    it("POST login", async () => {
        const helper = {
            name: "jack doe",
            email: "jackdoe2@me.com",
            password: "abcd12345",
        };

        await supertest(server).post("/auth/helpers/register").send(helper);

        const res = await supertest(server).post("/auth/helpers/login").send({
            email: "jackdoe2@me.com",
            password: "abcd12345",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Welcome jack doe!");
        expect(res.body.token).toBeDefined();
    });

    it("GET tickets", async () => {
        const log = await supertest(server).post("/auth/helpers/login").send({
            email: "helper1@me.com",
            password: "abc12345",
        });

        const res = await supertest(server)
            .get("/helpers/tickets")
            .set("Authorization", log.body.token);

        expect(res.statusCode).toBe(200);
        //expect(res.body.message).toMatch(/has been nuked/i);
        //expect(res.body).toHaveLength(5);
    });

    it("GET tickets by id", async () => {
        const log = await supertest(server).post("/auth/helpers/login").send({
            email: "helper1@me.com",
            password: "abc12345",
        });
        const res = await supertest(server)
            .get("/helpers/tickets/2")
            .set("Authorization", log.body.token);
        expect(res.statusCode).toBe(200);
    });

    it("GET tickets by status", async () => {
        const log = await supertest(server).post("/auth/helpers/login").send({
            email: "helper1@me.com",
            password: "abc12345",
        });
        const res = await supertest(server)
            .get("/helpers/tickets/status/open")
            .set("Authorization", log.body.token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(3);
    });

    it("GET tickets by category", async () => {
        const log = await supertest(server).post("/auth/helpers/login").send({
            email: "helper1@me.com",
            password: "abc12345",
        });
        const res = await supertest(server)
            .get("/helpers/tickets/category/javascript")
            .set("Authorization", log.body.token);
        //console.log(res.body);
        expect(res.statusCode).toBe(200);
    });

    it("PUT tickets by helper id", async () => {
        const log = await supertest(server).post("/auth/helpers/login").send({
            email: "helper1@me.com",
            password: "abc12345",
        });
        const res = await supertest(server)
            .put("/helpers/1/tickets/2/inprogress")
            .set("Authorization", log.body.token);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Successfully updated ticket.");
    });
});
