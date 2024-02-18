import { apiReq } from '$lib'
import { redirect } from '@sveltejs/kit'

export const actions = {
	default: async (event) => {
		const data = await event.request.formData()
    console.log(data.get('User'), data.get('Pass'))

    const response = await apiReq('login', {
      username: data.get('User'),
      password: data.get('Pass')
    })

    if (!response.ok) {
      return {
        error: 'Failed to fetch from database'
      }
    }

    const content = await response.json()
    if (content === null) {
      return {
        error: 'Invalid username or password'
      }
    } else {
      // Set cookie and redirect
      // TODO: This is not secure
      event.cookies.set('event_id', content, { httpOnly: false, path: '/' })
      throw redirect(303, '/costs')
    }
	}
}
