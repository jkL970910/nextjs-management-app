export const fetcher = async ({url, method, body, json=true}) => {
  const res = await fetch(url, {
    method,
    ...(body && {body: JSON.stringify(body)}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error('API error')
  }

  if (json) {
    const data = await res.json()
    return data.data
  }
}

// reason to put the methods out of component: 1) easy to unit test 2) seperation of concerns 3) might be reused
export const register = (user) => {
  return fetcher({url: '/api/register', method: 'post', body: user})
}

export const signin = (user) => {
  return fetcher({url: '/api/signin', method: 'post', body: user})
}