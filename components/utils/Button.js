import styles from "../../styles/components/Form.module.scss";

export default function Button({ name, className, ...props }) {
    const buttonClass = `${styles.Button} ${className || ''}`;
    
    return (
        <button {...props} className={buttonClass}>{name}</button>
    );
}
