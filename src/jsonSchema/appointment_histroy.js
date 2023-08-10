exports.appointmentHistorySchema = {
  id: "/appointment_history",
  type: "object",
  properties: {
    description: { type: "string" },
  },
  required: ["description"],
};
