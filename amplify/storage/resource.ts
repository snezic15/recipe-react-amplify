import { defineStorage } from "@aws-amplify/backend"

export const storage = defineStorage({
  name: "recipe-storage",
  access: (allow) => ({
    "recipe-data/{entity_id}/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write"]),
    ],
    "recipe-images/{entity_id}/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write"]),
    ],
  }),
})
