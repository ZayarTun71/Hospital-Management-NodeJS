exports.userSchema = {
  id: "/user",
  types: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    address: { type: "string" },
    date_of_birth: { type: "string" },
    gender: { type: "string" },
    phone: { type: "string" },
  },
  required: ["name", "email", "password"],
};
