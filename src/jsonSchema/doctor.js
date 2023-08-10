exports.doctorSchema = {
  type: "object",
  properties: {
    name: { type: "string"},
    email: { type: "string" , format: "email" },
    password: { type: "string" },
    address: { type: "string" },
    date_of_birth: { type: "string" },
    gender: { type: "string" },
    experience: { type: "integer" },
    department_id:{type:"integer"},
    phone: { type: "string" },
    degree_name: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: [
    "name",
    "email",
    "password",
    "address",
    "date_of_birth",
    "gender",
    "experience",
    "department_id",
    "phone",
    "degree_name"
  ],
};
