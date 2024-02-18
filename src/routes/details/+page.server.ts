export async function load({ cookies }) {
  const event_id = Number(cookies.get('event_id'))

  const response = await fetch('https://7d313ce5-6b39-42e9-87ff-826492480de7-00-3iy3t0hqahqc7.kirk.repl.co/get_data', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ event_id })
  })
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }
  const content = await response.json()
  console.log(content)

	return {
    event_id,
    content
  }
}
