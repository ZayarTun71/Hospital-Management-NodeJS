exports.appointmentSchema = {
  type: "Object",
  properties: {
    patient_id: { type: "integer" },
    doctor_id: { type: "integer" },
    day:{type:"string"},
    date: { type: "string" },
    symptom: { type: "string" },
    allergy: { type: "string" },
  },
  required: [
    "patient_id",
    "doctor_id",
    "day",
    "date",
    "symptom",
  ],
};
