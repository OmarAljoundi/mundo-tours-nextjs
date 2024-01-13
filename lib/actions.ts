'use server'

export async function getUserCountry() {
  const response = await (await fetch('https://ipapi.co/json', { method: 'GET', cache: 'no-store' })).json()
  return response.country_code
}
