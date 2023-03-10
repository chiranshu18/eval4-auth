const authServices = require('../../services/authServices');
const authControllers = require('../../controllers/authControllers');

describe('Auth Controller', () => {
    describe('register', () => {
        it('should return 200 if user is registered', async () => {
            const mockResult = { email: 'test@gmail.com',password:'123456'};
            jest.spyOn(authServices,'register').mockResolvedValue(mockResult);
            const mockReq = {}
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await authControllers.register(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });

        it('should return 400 if user not registered', async () => {
            const mockResult = {message: 'User not registered'};
            jest.spyOn(authServices,'register').mockRejectedValue(mockResult);
            const mockReq = {}
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await authControllers.register(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(400);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });
    });
});

describe('User Controller', () => {
    describe('POST /login', () => {
        it('should return 200 if user has logged in', async () => {
            const mockResult = { name: 'test',password:'123456'};
            jest.spyOn(authServices,'login').mockResolvedValue(mockResult);
            const mockReq = {}
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await authControllers.login(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });

        it('should return 400 if user not registered', async () => {
            const mockResult = {message: 'User not logged in'};
            jest.spyOn(authServices,'login').mockRejectedValue(mockResult);
            const mockReq = {}
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await authControllers.login(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(400);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });
    });
});