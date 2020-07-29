const supertest = require("supertest");
const server = require("../index");
const db = require("../data/config");

// a global jest hook to run before each individual test
beforeEach(async () => {
    const helper = {
        name: "jack doe",
        email: "jackdoe2@me.com",
        password: "abcd12345",
    };

    await supertest(server).post("/auth/helpers/register").send(helper);
});

describe("helpers endpoints", () => {
    it("POST login", async () => {
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
            email: "jackdoe2@me.com",
            password: "abcd12345",
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
            email: "jackdoe2@me.com",
            password: "abcd12345",
        });
        const res = await supertest(server)
            .get("/helpers/tickets/1")
            .set("Authorization", log.body.token);
        expect(res.statusCode).toBe(200);
    });
    it("GET tickets by status", async () => {
        const log = await supertest(server).post("/auth/helpers/login").send({
            email: "jackdoe2@me.com",
            password: "abcd12345",
        });
        const res = await supertest(server)
            .get("/helpers/tickets/status/open")
            .set("Authorization", log.body.token);
        //console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(3);
    });
});
