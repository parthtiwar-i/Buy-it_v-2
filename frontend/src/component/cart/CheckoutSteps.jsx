import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./stepper.css";

const CheckoutSteps = ({ activeSteps }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeSteps} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeSteps === index ? true : false}
            completed={activeSteps >= index ? true : false}
          >
            <StepLabel
              icon={item.icon}
              style={{
                color: activeSteps >= index ? "#0ee499" : "rgba(0,0,0,0.691)",
              }}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
