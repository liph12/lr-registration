import BasicInformation from "../BasicInformation";
import ContactAndSocials from "../ContactsAndSocials";
import CompleteAddress from "../CompleteAddress";
import PersonalBackground from "../PersonalBackground";
import { AccountDetailsHandler } from "../../types";

export default function CreateAccountActiveContent(
  props: AccountDetailsHandler
) {
  switch (props.step) {
    case 1:
      return <BasicInformation {...props} />;
    case 2:
      return <ContactAndSocials {...props} />;
    case 3:
      return <CompleteAddress {...props} />;
    case 4:
      return <PersonalBackground {...props} />;
  }
}
