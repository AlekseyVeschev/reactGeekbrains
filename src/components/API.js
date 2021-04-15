import { BASE_API_URL, MY_KEY } from "../utils/constants";

export async function getBotResponse(message, botId) {
   try {
      let response = await fetch(`${BASE_API_URL}?instance=${botId}&message=${message}&application=${MY_KEY}`)
      if (!response.ok) { throw new Error('Connection error ' + response.status) }

      let data = await response.json();
      return data

   } catch (error) {
      throw error.message
   }
}
