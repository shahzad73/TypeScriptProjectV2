export interface IUsers {
  ID: number;

  password: string | null;

  firstname: string | null;

  lastname: string | null;

  email: string | null;

  secret: string | null;

  passportNumber: string | null;

  nationalId: string | null;

  dob: string | null;

  maritalStatus: string | null;

  occupation: string | null;

  pic: string | null;

  countryid: number | null;
  country: string | null;  


  issuerCanEditProfile: number | null;

}
