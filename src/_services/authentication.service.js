import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password })
  };

  return fetch(
    `${process.env.REACT_APP_WOO_URL}wp-json/jwt-auth/v1/token`,
    requestOptions
  ).then((user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);

    return user;
  });
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
