const request = require("supertest");
const app = require('/index');

describe("Test todo methods", () => {
    it(`Returns all todos`, async done => {
        await request(app).get("/register").expect(200).then((response) => {
            expect(response.body.name).toBe("Finished loading");
        });
        done();
    });
    
});

describe("Test responses from querying an external API", () => {
    it(`Should load entire page for registration page`, async done => {
        await request(app).get("/register").expect(200).then((response) => {
            expect(response.body.name).toBe("Finished loading");
    });
    done();
});

});