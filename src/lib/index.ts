const apiBase = 'https://7d313ce5-6b39-42e9-87ff-826492480de7-00-3iy3t0hqahqc7.kirk.repl.co/'

export function apiReq(endpoint: string, body: any) {
  return fetch(apiBase + endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
