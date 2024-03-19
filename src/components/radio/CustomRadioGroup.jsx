import * as React from "react";
import { styled } from "@mui/material/styles";
import { Radio, RadioGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { COLORS } from "../../utils/common_helpers/colors";

const CustomRadioGroup = styled((props) => {
  const { options, handleRadioChange, size, defaultValue } = props;
  return (
    <RadioGroup row onChange={handleRadioChange} defaultValue={defaultValue}>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={
            <Radio
              disableRipple
              sx={{
                color: COLORS.darkGrey,
                "&.Mui-checked": {
                  color: COLORS.violetMain,
                },
                "& .MuiSvgIcon-root": {
                  fontSize: size === "small" ? 18 : 22,
                },
              }}
            />
          }
          label={option.label}
          sx={{
            ".MuiFormControlLabel-label": {
              fontFamily: "Inter",
              fontWeight: 200,
              fontSize: size === "small" ? 15 : 22,
            },
          }}
        />
      ))}
    </RadioGroup>
  );
})({
  display: "flex",
  flexDirection: "row",
  gap: "16px",
});

export const CustomRadioButton = ({ options, handleRadioChange, size, defaultValue }) => {
  return (
    <CustomRadioGroup
      options={options}
      handleRadioChange={handleRadioChange}
      size={size}
      defaultValue={defaultValue}
    />
  );
};
