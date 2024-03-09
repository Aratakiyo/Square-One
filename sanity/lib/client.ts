import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: "skIMd2we6pH4swMTTqKoOJnVLkXinruhOBOqHIvNPVVOb3ms7S621AZJEwIUVvi0O9qXnb6OeniIOPRZ5GNKOG294zPbEHS9LwlhVpul9c1IR1XJMeEGXGHBAPOa3j6NXJ143ZUrqWkv2UnseZMRVDE7sem2USRaiUPqlXgLoQgqbWciCzLe",
})
