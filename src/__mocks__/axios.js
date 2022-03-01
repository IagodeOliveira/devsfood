const data = {
  email: 'medina@gmail.com',
  status: 201,
  msg: 'User logged in',
};

export default {
  post: jest.fn().mockReturnValueOnce(data),
};
