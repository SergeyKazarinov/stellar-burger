import { useState, useCallback, ChangeEvent } from 'react';

import { IErrors, IValues } from '../types/interfaces/IForm';

export const useFormWithValidation = () => {
  const [values, setValues] = useState<IValues>({});
  const [errors, setErrors] = useState<IErrors>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLFormElement & HTMLInputElement>): void => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const form: HTMLFormElement | null = target.closest('form');
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(form!.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm, setValues};
};