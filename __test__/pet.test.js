const app = require("../app");
const request = require("supertest");

describe("Pet Service", () => {
    describe("Normal scenario", () => {
        it("should response with 201 when new pet created with all the fields", async () => {
            const response = await request(app).post("/api/pet").send({
                id: 5,
                name: "Sandy",
                type: "Hamster"
            });

            expect(response.statusCode).toBe(201);
        });

        it("should be content type of json in the header when a new pet is added", async () => {
            const response = await request(app).post("/api/pet").send({
                id: 5,
                name: "Sandy",
                type: "Hamster"
            });

            expect(response.headers["content-type"]).toEqual(expect.stringContaining("application/json"));
        });
    });

    describe("Negative scenario", () => {
        it("should response with 400 when name ro type is missing", async () => {
            const bodyData = [
                {
                    id: 5,
                    name: "Sandy"
                },
                {
                    id: 5,
                    type: "Hamster"
                },
                {
                    id: 5
                }
            ];

            for (const data of bodyData) {
                const response = await request(app).post("/api/pet").send(data);
                expect(response.statusCode).toBe(400);
            }
        });
    });
});
