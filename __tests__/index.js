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

describe("users tests", () => {
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
        expect(res.body.id).toBeDefined();
        expect(res.body.username).toBe("jackdoe1");
    });
});
