const home = document.getElementById('home');
const signin = document.getElementById('signin');
const signup = document.getElementById('signup');

const Name = document.getElementById('signup_name');
const Email = document.getElementById('signup_email');
const Password = document.getElementById('signup_password');

const SigninEmail = document.getElementById('email');
const SigninPassword = document.getElementById('password');

const SignupMsg = document.getElementById('signup_msg');
const SigninMsg = document.getElementById('signin_msg');

const users = [];

// clear

function ClearSignin() {
  SigninEmail.value = '';
  SigninPassword.value = '';
}

function ClearSignup() {
  Name.value = '';
  Email.value = '';
  Password.value = '';
}

// HOME section

function GoHome() {
  home.classList.remove('d-none');
  signin.classList.add('d-none');
}

function GetStoreUsers() {
  return (JSON.parse(localStorage.getItem('users')));
}

function WelcomeMsg(index) {
  GetStoreUsers();
  const StoreUsers = GetStoreUsers();

  document.getElementById('welcome').innerHTML = (`WELCOME ${StoreUsers[index].name.toUpperCase()}`);
}

// signup massages

function RemoveMsg() {
  SignupMsg.innerHTML = ('');
}

function success() {
  SignupMsg.innerHTML = ('<p class="text-success">Success</p>');
  setTimeout(RemoveMsg, 3000);
}

function SignupRequired() {
  SignupMsg.innerHTML = ('<p class="text-danger">All inputs are required</p>');
  setTimeout(RemoveMsg, 3000);
}

function exists() {
  SignupMsg.innerHTML = ('<p class="text-danger">Email already exists</p>');
  setTimeout(RemoveMsg, 3000);
}

function Validation() {
  SignupMsg.innerHTML = ('<p class="text-danger">Enter a valid Email or password</p>');
  setTimeout(RemoveMsg, 3000);
}

// signin masseges

function RemoveInMsg() {
  SigninMsg.innerHTML = ('');
}

function ErrorMsg() {
  SigninMsg.innerHTML = ('<p class="text-danger">incorrect email or password</p>');
  setTimeout(RemoveInMsg, 3000);
}

function SigninRequired() {
  SigninMsg.innerHTML = ('<p class="text-danger">All inputs are required</p>');
  setTimeout(RemoveInMsg, 3000);
}

// display padges

document.getElementById('signup_btn').addEventListener('click', () => {
  signin.classList.add('d-none');
  signup.classList.remove('d-none');
  ClearSignup();
});

document.getElementById('signin_btn').addEventListener('click', () => {
  signup.classList.add('d-none');
  signin.classList.remove('d-none');
  ClearSignin();
});

document.getElementById('logout_btn').addEventListener('click', () => {
  home.classList.add('d-none');
  signin.classList.remove('d-none');
  ClearSignin();
});

// sign up section

// regex

function ValidateEmail() {
  const RegEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return RegEmail.test(Email.value);
}

function ValidatePassword() {
  const RegPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  return RegPassword.test(Password.value);
}

// chech

function chech() {
  GetStoreUsers();
  const StoreUsers = GetStoreUsers();
  let ChechValue = '';

  if (localStorage.length !== 0) {
    for (let i = 0; i < StoreUsers.length; i += 1) {
      if (Email.value === StoreUsers[i].email) {
        ChechValue = (true);
      }
    }
  }
  return (ChechValue);
}

// AddNewUser

document.getElementById('register_btn').addEventListener('click', (e) => {
  e.preventDefault();

  const user = {
    name: Name.value,
    email: Email.value,
    password: Password.value,
  };
  if (Name.value === '' || Password.value === '' || Email.value === '') {
    SignupRequired();
  } else if (ValidateEmail() === true && ValidatePassword() === true) {
    if (chech() === true) {
      exists();
      ClearSignup();
    } else {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      ClearSignup();
      success();
    }
  } else {
    Validation();
  }
});

// sign in section

document.getElementById('login_btn').addEventListener('click', (e) => {
  e.preventDefault();

  GetStoreUsers();
  const StoreUsers = GetStoreUsers();

  if (SigninEmail.value === '' || SigninPassword.value === '') {
    SigninRequired();
  } else {
    for (let i = 0; i < StoreUsers.length; i += 1) {
      if (SigninEmail.value === StoreUsers[i].email && SigninPassword.value === StoreUsers[i].password) {
        GoHome();
        WelcomeMsg(i);
      } else { ErrorMsg(); }
    }
  }
});
