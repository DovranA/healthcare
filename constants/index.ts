export const GenderOptions = ["Erkek", "Aýal"];

export const PatientFormDefaultValues = {
  birthDate: undefined,
  identificationDocument: undefined,
  email: "",
  phone: "",
  gender: "Erkek",
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Dogluş şahadatnamasy",
  identificationNumber: "",
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Dogluş şahadatnamasy",
  "Sürüjilik şahadatnamasy",
  "Lukmançylyk ätiýaçlandyryş şahadatnamasy/polisi",
  "Harby şahsyýetnamasy",
  "Milli şahsyýetnamasy",
  "Pasport",
  "Ýaşaýyş rugsatnamasy (Ýaşyl karta)",
  "Sosial üpjünçilik şahadatnamasy",
  "Ştat şahsyýetnamasy",
  "Talyp şahsyýetnamasy",
  "Saýlaw şahsyýetnamasy",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Myrat Amanow",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Aýgül Atayeva",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Begenç Orazow",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Gurbangül Nuryýewa",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jeren Annagulyýewa",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Maksat Rejepow",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Aýna Geldiýewa",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Gülşirin Hojamyradowa",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Serdar Rahmanow",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
