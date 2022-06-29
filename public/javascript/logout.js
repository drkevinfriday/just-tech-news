

async function logout() {
    console.log('this works')
    const response = await fetch('/api/users/logout',{
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok){
        console.log('lotgout response ok ')
        document.location.replace('/login')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#logout').addEventListener('click', logout)