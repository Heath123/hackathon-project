import { redirect } from "@sveltejs/kit"

export function GET({ url, cookies }) {
	// Remove cookie and redirect to login
  cookies.delete('event_id', { path: '/' })
  throw redirect(303, '/login')
}
