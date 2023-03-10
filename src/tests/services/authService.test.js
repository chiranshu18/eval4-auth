const authServices = require("../../services/authServices");
const { Users } = require("../../../database/models");

describe("User Services", () => {
    describe("POST /register", () => {
      it("should register a user", async () => {
        const mockResult = {
          name: "test@gmail.com",
          password: "123456",
        };
        jest.spyOn(Users, "create").mockResolvedValue(mockResult);
        const result = await authServices.register(mockResult);
        expect(result).toEqual(mockResult);
      });
  
      
  
    });
  
    describe("POST /login", () => {
      it("should not login a user when password is null", async () => {
        jest.spyOn(Users, "findOne").mockResolvedValue(null);
        await expect(authServices.login("shreyas")).rejects.toThrow(Error("User does not exist"));
      });
  
      it("should not login a user when password is ", async () => {
  
            jest.spyOn(Users, "findOne").mockResolvedValue({
              dataValues: {
                id: "1",
              },
              name: "test",
              password: "123456",
            });
  
            const mockResult = {
              dataValues: {
                id: "1",
              },
              name: "test",
              password: "890876",
            }
  
            await expect(authServices.login(mockResult)).rejects.toThrow(Error("invalid password"));
  
      });
    });
  });