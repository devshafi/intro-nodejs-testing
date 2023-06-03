const mongoose = require("mongoose");
const app = require("../app");
const request = require("supertest");
const { connectDB, dropDB, dropCollections } = require("../config/setupTestDB");
const Pet = require("../models/pet");

// connect to the database before run the test file
beforeAll(async () => {
    await connectDB();
});

// drop the database after the test file is finished
afterAll(async () => {
    await dropDB();
});
// drop all of the collections in the database after each test
afterEach(async () => {
    await dropCollections();
});

describe("Pet Post Service", () => {
    let token;
    beforeAll(() => {
        // Get the authorization token
        token = "valid-token"; // Replace with your valid authorization token
    });

    beforeEach(async () => {
        // Insert mock pets into the database before each test
        await Pet.create([
            { name: "Sheldon", type: "Turtle" },
            { name: "Polly", type: "Bird" }
        ]);
    });

    describe("when a valid object is posted", () => {
        it("should response with 201 when new pet created with all the fields", async () => {
            const response = await request(app)
                .post("/api/pet")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    name: "Sandy",
                    type: "Hamster"
                });

            expect(response.statusCode).toBe(201);
        });

        it("should be content type of json in the header when a new pet is added", async () => {
            const response = await request(app).post("/api/pet").send({
                name: "Sandy",
                type: "Hamster"
            });

            expect(response.headers["content-type"]).toEqual(expect.stringContaining("application/json"));
        });
    });

    describe("when name and type is missing", () => {
        it("should response with 400 when name or type is missing for the pet", async () => {
            const bodyData = [
                {
                    name: "Sandy"
                },
                {
                    type: "Hamster"
                },
                {}
            ];

            for (const data of bodyData) {
                const response = await request(app)
                    .post("/api/pet")
                    .set("Authorization", `Bearer ${token}`)
                    .send(data);
                expect(response.statusCode).toBe(400);
            }
        });
    });

    describe("authorization test", () => {
        it("should response with 401 when Authorization header is not passed", async () => {
            const response = await request(app).post("/api/pet").send({
                name: "Sandy",
                type: "Hamster"
            });

            expect(response.statusCode).toBe(401);
        });
    });

    describe("authorization test", () => {
        it("should response with 401 when invalid token is passed is not passed", async () => {
            const response = await request(app)
                .post("/api/pet")
                .set("Authorization", `Bearer invalid token`)
                .send({
                    name: "Sandy",
                    type: "Hamster"
                });

            expect(response.statusCode).toBe(401);
        });
    });
});

describe("Pet Get Service", () => {
    describe("when a valid object is fetched", () => {
        it("should response with 200 when pets are fetched", async () => {
            const response = await request(app).get("/api/pet");

            expect(response.statusCode).toBe(200);
        });

        it("should be content type of json in the header when a new pets are fetched", async () => {
            const response = await request(app).get("/api/pet");
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("application/json"));
        });
    });
});
