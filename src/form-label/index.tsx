import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

type FormLabelProps = {
  label: React.ReactNode,
  required?: boolean,
  input: React.ReactNode,
  htmlFor?: string,

  editable?: boolean,
};

const FormLabel: React.FunctionComponent<FormLabelProps> = ({
  label,
  required,
  input,
  htmlFor,
  editable,
}) => (
  <div className={styles.formLabel}>
    <label className={styles.formLabelLabel} htmlFor={htmlFor}>
      {typeof label === 'string' ? <span className={styles.formLabelLabelText}>{label}</span> : label}
      {required ? <span className={styles.formLabelRequired}>* Required</span> : null}
    </label>
    {input}
  </div>
);

export default FormLabel;
