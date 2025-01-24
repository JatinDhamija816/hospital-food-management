export const patientFields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Disease", name: "disease", type: "text", required: true },
  { label: "Allergies", name: "allergies", type: "text", required: false },
  { label: "Room Number", name: "room", type: "number", required: true },
  { label: "Bed Number", name: "bed", type: "number", required: true },
  { label: "Floor Number", name: "floor", type: "number", required: true },
  { label: "Age", name: "age", type: "number", required: true },
  { label: "Contact", name: "contact", type: "text", required: true },
  {
    label: "Emergency Contact",
    name: "emergencyContact",
    type: "text",
    required: true,
  },
];
