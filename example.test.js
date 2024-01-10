const fs = require("fs");
const agent = require("supertest");

const app = require("./app");

beforeAll(() => {
    const dbData = JSON.stringify({notes: []}, null, 4)
    fs.writeFileSync("db.json", dbData)
})

describe("POST /notes", () => {
    it("should create a new note", async () => {
        const res = await agent(app)
            .post("/notes")
            .send({title: "Test", content: "Test content"})
            .expect(201);
        expect(res.body).toEqual("Note created");
    });
})

describe("GET /notes", () => {
    it("should return all notes", async () => {
        const res = await agent(app)
            .get("/notes")
            .expect(200);
        expect(res.body).toEqual([{
            title: "Test",
            content: "Test content"
        }]);
    });
})

describe("GET /notes/:id", () => {
    it("should return a note", async () => {
        const res = await agent(app)
            .get("/notes/0")
            .expect(200);
        expect(res.body).toEqual({title: "Test", content: "Test content"});
    });
})

describe("PUT /notes/:id", () => {
    it("should update a note", async () => {
        const res = await agent(app)
            .put("/notes/0")
            .send({title: "Test", content: "Test content"})
            .expect(200);
        expect(res.body).toEqual("Note updated");
    });
})

describe("DELETE /notes/:id", () => {
    it("should delete a note", async () => {
        const res = await agent(app)
            .delete("/notes/0")
            .expect(200);
        expect(res.body).toEqual("Note deleted");
    });
})