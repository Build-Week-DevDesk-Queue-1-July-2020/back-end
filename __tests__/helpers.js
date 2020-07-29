const supertest = require("supertest");
const server = require("../index");
const db = require("../data/config");

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
