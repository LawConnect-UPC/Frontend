import styles from "../../styles/components/Form.module.scss"
import Alert from "./Alert";

export default function Input({ type, placeholder, value, onChange, showLabel = true, name, alert=null }) {
    return (
        <div className={styles.Input}>
            {showLabel && <label htmlFor={name}>{name}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                id={name}
            />
            {alert}
        </div>
    );
}
