import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactToolTip from 'react-tooltip';
import LogoutIcon from '@mui/icons-material/Logout';

import { Container, Menu, PageBody } from './appStyled';
import HomeScreen from './pages/HomeScreen';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import MenuItem from './components/MenuItem';
import Cart from './components/Cart';
import RequireAuth, { RequireNoAuth } from './components/RequireAuth';

function App() {
  const dispatch = useDispatch();
  const { email } = useSelector((state: User) => state.user);

  const handleLogOut = () => {
    localStorage.setItem('authToken', '');
    if (email !== '') {
      dispatch({
        type: 'Reset',
        payload: {},
      });
      dispatch({
        type: 'Set_Token',
        payload: '',
      });
    }
  };

  useEffect(() => {
    if (email === '') {
      ReactToolTip.rebuild();
    }
  }, [email]);

  return (
    <Router>
      <Container>
        <Menu>
          {email === '' && <MenuItem icon="" link="/login" title="Login" />}
          {email !== '' && (
            <div
              className="logout"
              data-tip="Logout"
              data-for="tip-right"
              onClick={handleLogOut}
            >
              <LogoutIcon />
            </div>
          )}

          <MenuItem icon="/assets/store.png" link="/" title="Home" />
          <MenuItem icon="/assets/order.png" link="/orders" title="Orders" />
          <MenuItem
            icon="/assets/profile.png"
            link="/profile"
            title="Profile"
          />
        </Menu>
        <PageBody>
          <Routes>
            <Route
              path="/login"
              element={
                <RequireNoAuth redirectTo="/">
                  <Login />
                </RequireNoAuth>
              }
            />

            <Route
              path="/signup"
              element={
                <RequireNoAuth redirectTo="/">
                  <SignUp />
                </RequireNoAuth>
              }
            />

            <Route path="/" element={<HomeScreen />} />

            <Route
              path="/orders"
              element={
                <RequireAuth redirectTo="/login">
                  <Orders />
                </RequireAuth>
              }
            />

            <Route
              path="/profile"
              element={
                <RequireAuth redirectTo="/login">
                  <Profile />
                </RequireAuth>
              }
            />

            <Route path="/cancel" element={<Cancel />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </PageBody>
        <Cart />
        <ReactToolTip id="tip-top" place="top" effect="solid" />
        <ReactToolTip id="tip-right" place="right" effect="solid" />
      </Container>
    </Router>
  );
}

export default App;
