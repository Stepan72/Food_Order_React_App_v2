import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => {
  return value.trim() === "";
};

const isNotFiveCharts = (value) => {
  return value.trim().length < 5;
};

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    let enteredName = nameInputRef.current.value;
    let enteredStreet = streetInputRef.current.value;
    let enteredPostalCode = postalCodeInputRef.current.value;
    let enteredCity = cityInputRef.current.value;

    let enteredNameIsValid = !isEmpty(enteredName);
    let enteredStreetIsValid = !isEmpty(enteredStreet);
    let enteredPostalCodeIsValid =
      !isEmpty(enteredPostalCode) && !isNotFiveCharts(enteredPostalCode);
    let enteredCityIsValid = !isEmpty(enteredCity);

    setFormValidity((prevValue) => {
      return {
        ...prevValue,
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid,
      };
    });

    let formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;
    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formValidity.name && classes.invalid
        } `}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p>Please enter valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.street && classes.invalid
        } `}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.street && <p>Please enter valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.postalCode && classes.invalid
        } `}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formValidity.postalCode && <p>Please enter valid postal Code</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.city && classes.invalid
        } `}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && <p>Please enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
