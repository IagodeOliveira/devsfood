import { waitFor, cleanup } from '@testing-library/react';
import { render, screen } from './test-utils';
import userEvent from '@testing-library/user-event';
import Login from '.';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

// const mockedRouter = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedRouter,
//   Link: () => mockedRouter,
// }));

describe('testing Login page', () => {
  it('should go from Login page to SignUp page', () => {
    const { getByText, debug, findByText, queryByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // const signUpButton = getByText('Sign Up');
    const signUpButton = screen.getByRole('link', { name: 'Sign Up' });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute('href', '/signup');

    userEvent.click(signUpButton);

    expect(queryByText('Already have an Account?')).not.toBeInTheDocument();

    // debug();

    // expect(await findByText('Already have an Account?')).toBeInTheDocument();
    // const loginpButton = screen.getByRole('link', { name: 'Login' });
    // expect(loginpButton).toBeInTheDocument();
  });

  it('should login', async () => {
    const { getByTestId, getByPlaceholderText, debug } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // debug();

    const email = getByPlaceholderText('Enter email*');
    const password = getByPlaceholderText(
      'Enter password* (at least 6 characters)'
    );
    const submit = getByTestId('sub');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    userEvent.type(email, 'medina@gmail.com');
    userEvent.type(password, '1234567');

    expect(email.value).toEqual('medina@gmail.com');
    expect(password.value).toEqual('1234567');

    const data = {
      email: 'medina@gmail.com',
      status: 201,
      msg: 'User logged in',
    };

    axios.post.mockReturnValueOnce(data);
    expect(axios.post).not.toHaveBeenCalled();

    userEvent.click(submit);
    expect(axios.post).toHaveBeenCalled();

    expect(axios.post).toHaveBeenCalledWith('/auth/login', {
      email: 'medina@gmail.com',
      password: '1234567',
    });

    expect(axios.post).toReturnWith(data);

    // expect(await screen.findByText('Select a Category')).toBeInTheDocument();
    // await waitFor(() => {
    //   expect(getByText('Select a Category')).toBeInTheDocument();
    // });
  });
});

// expect(screen.getByRole('button', { name: /submit/i })).toBeDefined();
// expect(await screen.findByRole('button', { name: /submit/i })).toBeEnabled();
