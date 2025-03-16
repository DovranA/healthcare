import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Adyňyz azyndan 2 harp bolmaly")
    .max(50, "Adyňyz iň köp 50 harp bolmaly"),
  email: z.string().email("Nädogry email salgy"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Nädogry telefon belgisi"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Adyňyz azyndan 2 harp bolmaly")
    .max(50, "Adyňyz iň köp 50 harp bolmaly"),
  email: z.string().email("Nädogry email salgy"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Nädogry telefon belgisi"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Erkek", "Aýal", "Beýleki"]),
  address: z
    .string()
    .min(5, "Salgy azyndan 5 harp bolmaly")
    .max(500, "Salgy iň köp 500 harp bolmaly"),
  occupation: z
    .string()
    .min(2, "Ady azyndan 2 harp bolmaly")
    .max(500, "Ady iň köp 500 harp bolmaly"),
  emergencyContactName: z
    .string()
    .min(2, "Ady azyndan 2 harp bolmaly")
    .max(50, "Ady iň köp 50 harp bolmaly"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Nädogry telefon belgisi"
    ),
  primaryPhysician: z.string().min(2, "Iň az bir lukman saýlamaly"),
  insuranceProvider: z
    .string()
    .min(2, "Ätiýaçlandyryş ady azyndan 2 harp bolmaly")
    .max(50, "Ätiýaçlandyryş ady iň köp 50 harp bolmaly"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Ätiýaçlandyryş belgisi azyndan 2 harp bolmaly")
    .max(500, "Ätiýaçlandyryş belgisi iň köp 500 harp bolmaly"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Dowam etmek üçin bejergä razy bolmaly",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Dowam etmek üçin maglumatlary açmaga razy bolmaly",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Dowam etmek üçin gizlinlige razy bolmaly",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Iň az bir lukman saýlamaly"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Sebäp azyndan 2 harp bolmaly")
    .max(500, "Sebäp iň köp 500 harp bolmaly"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Iň az bir lukman saýlamaly"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Iň az bir lukman saýlamaly"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Sebäp azyndan 2 harp bolmaly")
    .max(500, "Sebäp iň köp 500 harp bolmaly"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
