import { defineStorage } from "@aws-amplify/backend"

export const storage = defineStorage({
  name: "recipe-storage",
  access: (allow) => ({
    "recipes/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write"]),
    ],
  }),
})
