import styles from './Checkbox.module.css';

interface ICheckbox {
  label: string;
  value: boolean;
  onChange: () => void;
}

const Checkbox = ({ label, value, onChange }: ICheckbox) => {
  return (
    <label className={styles.checkboxContainer}>
      <input type='checkbox' checked={value} onChange={onChange} />
      <span className={styles.label}> {label}</span>
    </label>
  );
};

export default Checkbox;
