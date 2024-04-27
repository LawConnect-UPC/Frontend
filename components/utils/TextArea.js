import styles from "../../styles/components/Form.module.scss"

export default function TextArea({alert, name, ...props}) {
    return (
        <>
            <div className={styles.Input}>
                <label>
                    {name}
                </label>
                <textarea {...props}></textarea>
                {alert}
            </div>
        </>
    )
}