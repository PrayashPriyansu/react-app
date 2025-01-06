import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      breakfastPrice,
      maxGuestsPerBooking,
    } = {},
    isLoading,
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value, defaultValue } = e.target;

    if (!value || defaultValue === value) return;

    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isLoading}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isLoading}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isLoading}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isLoading}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
