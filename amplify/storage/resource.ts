import { defineStorage } from "@aws-amplify/backend"

export const storage = defineStorage({
  name: "recipe-storage-new",
  access: (allow) => ({
    "recipeImages/{entity_id}/*": [
      allow.guest.to(["read", "write"]),
      allow.authenticated.to(["read", "write"]),
    ],
  }),
  isDefault: true,
})
