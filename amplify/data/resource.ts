import { type ClientSchema, a, defineData } from "@aws-amplify/backend"

const schema = a.schema({
  Recipes: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      isActive: a.boolean().required(),
      tags: a.string().array(),
      recipeContent: a.json(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
})
