const mainForm = document.querySelector('form')

void async function () {
  const response = await fetch('/users', {
    headers: {
      'Accept': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    }
  })

  if (response.status == 401) {
    alert('You are not logged in')
    window.location.href = '/'
    return
  }

  const users = await response.json()
  users.forEach(user => {
    const newForm = mainForm.cloneNode(true)
    newForm.name.value = user.name
    newForm.email.value = user.email
    newForm.dataset.id = user.id
    mainForm.before(newForm)
  })
}()

document.addEventListener('submit', async (event) => {
  event.preventDefault()
  const action = event.submitter.dataset.action ?? null
  const currentForm = event.target

  if (action === 'delete') {
    const id = currentForm.dataset.id
    const method = 'DELETE'
    const url = `/users/${id}`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    }

    const response = await fetch(url, { method, headers })
    
    if (response.status == 401) {
      alert('Vc não tem permissão para deletar este usuário')
      return
    }
    
    if (!response.ok)
      return console.error('Error:', response.statusText)
    currentForm.remove()
    return
  }

  if (action === 'update') {
    const id = currentForm.dataset.id
    const method = 'PUT'
    const url = `/users/${id}`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    }
    const name = currentForm.name.value
    const email = currentForm.email.value
    const password = currentForm.password.value
    const body = JSON.stringify({ name, email, password })
    const response = await fetch(url, { method, headers, body, })

    
    if (response.status == 401) {
      alert('Vc não tem permissão para atualizar este usuário')
      return
    }

    if (!response.ok)
      return console.error('Error:', response.statusText)
    return
  }

  if (action === 'create') {
    const method = 'POST'
    const url = '/users'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    }
    const name = currentForm.name.value
    const email = currentForm.email.value
    const password = currentForm.password.value
    const body = JSON.stringify({ name, email, password })
    const response = await fetch(url, { method, headers, body })
    if (!response.ok)
      return console.error('Error:', response.statusText)
    const responseData = await response.json()
    const newForm = mainForm.cloneNode(true)
    newForm.name.value = responseData.name
    newForm.email.value = responseData.email
    newForm.dataset.id = responseData.id
    mainForm.reset()
    mainForm.before(newForm)
    return
  }
})