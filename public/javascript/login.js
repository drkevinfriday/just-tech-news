

async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const reponse =  await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response)

      //check the response status
      if(response.ok){
        console.log('success')
      }else{
        alert(repsonse.statusText);
      }
    }
  }

async function loginFormHandler(event) {
    event.preventDefault();
    console.log('loginworks')
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response =  await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password,

        }),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response)

      //check the response status
      if(response.ok){
        document.location.replace('/')
      }else{
        alert(repsonse.statusText);
      }
    }
  }

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)