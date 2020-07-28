const supertest = require("supertest");
const server = require("../index");
const db = require("../data/config");

// a global jest hook to run before each individual test
beforeEach(async () => {
    // re-run the seeds and start with a fresh database for each test
    await db.seed.run();
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
                email: "jackdoe1@me.com",
                password: "abcd12345",
            });
        expect(res.statusCode).toBe(201);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body.message).toBe("Successfully added new student.");
    });

    it("POST login", async () => {
        const user = {
            name: "jack doe",
            cohort: "pt-14",
            email: "jackdoe1@me.com",
            password: "abcd12345",
        };

        const reg = await supertest(server)
            .post("/auth/students/register")
            .send(user);
        expect(reg.statusCode).toBe(201);

        const res = await supertest(server).post("/auth/students/login").send({
            email: "jackdoe1@me.com",
            password: "abcd12345",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Welcome jack doe!");
        expect(res.body.token).toBeDefined();
    });

    it("GET tickets by student id", async () => {
        const user = {
            name: "jack doe",
            cohort: "pt-14",
            email: "jackdoe1@me.com",
            password: "abcd12345",
        };

        const reg = await supertest(server)
            .post("/auth/students/register")
            .send(user);
        expect(reg.statusCode).toBe(201);

        const log = await supertest(server).post("/auth/students/login").send({
            email: "jackdoe1@me.com",
            password: "abcd12345",
        });

        const res = await supertest(server)
            .get("/students/3/tickets")
            .set("Authorization", log.body.token);

        expect(res.statusCode).toBe(200);
    });
});
