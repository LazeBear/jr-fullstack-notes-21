const { validateToken } = require('../../src/common/utils/jwt');
const authGuardMiddleware = require('../../src/middleware/authGuard.middleware');
jest.mock('../../src/common/utils/jwt');

describe('authentication guard middleware', () => {
  // hooks
  beforeEach(() => {
    validateToken.mockReset();
  });

  it('should return 401 if authorization header is not defined', () => {
    // setup
    const req = {
      header: jest.fn(),
    };
    const res = {
      formatResponse: jest.fn(),
    };
    const next = jest.fn();

    // execute
    authGuardMiddleware(req, res, next);

    // compare
    expect(res.formatResponse).toHaveBeenCalledWith(
      'Missing authroization token',
      401
    );
    // toHaveBeenCalled()
  });

  it('should call next function when token is valid', () => {
    // setup
    const token = 'any_token';
    const req = {
      header: jest.fn(),
    };
    const res = {
      formatResponse: jest.fn(),
    };
    const next = jest.fn();

    req.header.mockReturnValue(`Bearer ${token}`);
    validateToken.mockImplementation((token) => {
      return { token };
    });

    // execute
    authGuardMiddleware(req, res, next);

    // compare
    // expect(req.user).toEqual({ token });
    expect(next).toHaveBeenCalled();
    // expect(validateToken).toHaveBeenCalledWith(token);
  });
});
