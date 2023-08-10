exports.scheduleSchema = {
  id: "/schedule",
  types: "object",
  properties: {
    day: { type: "string" },
    time_from: { type: "string" },
    time_to: { type: "string" },
    patient_count: { type: "integer" },
    limit: { type: "integer" },
  },
  required: ["day", "time_from", "time_to", "patient_count", "limit"],
};
