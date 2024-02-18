import { apiReq } from '$lib'
import { redirect } from '@sveltejs/kit'

export const actions = {
	default: async (event) => {
		const data = await event.request.formData()
    console.log(data.get('User'), data.get('Pass'))

    const response = await apiReq('add_event', {
      username: data.get('User'),
      password: data.get('Pass'),
      email: data.get('Email')
    })

    if (!response.ok) {
      return {
        error: 'Failed to contact database'
      }
    }

    const content = await response.json()
    if (content !== true) {
      return {
        error: 'Invalid username or password'
      }
    } else {
      throw redirect(303, '/login')
    }
	}
}
