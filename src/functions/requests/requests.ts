const requests = {
  get: Get,
  put: Put,
  post: Post,
  delete: Delete
}

// in dev 
let address: string = "http://127.0.0.1:5000/"

// put
async function Put(url: string = " ", data = {}) {
  const response = await fetch(`${address}${url}`, {
      method: 'PUT', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  });
  return response ? response.json() : console.log('no reponse')
};

// get
async function Get(url: string = " ") {
  const response = await fetch(`${address}${url}`, {
      method: 'GET', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
  });
  return response ? response.json() : console.log('no reponse')
};

async function Post(url: string = " ", data = {}) {
  // handle adding a token

  const response = await fetch(`${address}${url}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return response ? response.json() : console.log('no reponse')
}

// delete
async function Delete(url: string = " ") {
  const response = await fetch(`${address}${url}`, {
      method: 'DELETE', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
  });
  return response ? response.json() : console.log('no reponse')
};
  
export default requests