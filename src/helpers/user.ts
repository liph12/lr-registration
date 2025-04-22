export const userAccountFields = {
  email: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: false,
  sex: {
    select: [
      {
        id: 1,
        label: "Male",
      },
      {
        id: 2,
        label: "Female",
      },
    ],
    value: null,
    content: "",
  },
  country: "Philippines",
  state: "",
  city: "",
  barangay: "",
  birthday: "",
  address: "",
  postalCode: "",
  mobileNumber: "",
  phoneNumber: "",
  citizenShip: "",
  maritalStatus: {
    select: [
      {
        id: 1,
        label: "Single",
      },
      {
        id: 2,
        label: "Married",
      },
      {
        id: 3,
        label: "Separated",
      },
    ],
    value: null,
    content: "",
  },
  tin: "",
  fbLink: "",
  personalBackground: {
    institution: "",
    degree: "",
    specialSkills: "",
    workExperience: "",
    about: "",
    references: "",
    email: "",
  },
};
