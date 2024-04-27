import styles from "../../styles/components/Alert.module.scss"

export default function Alert({message}) {
   return (
      <p className={styles.Alert}>
        {message}
      </p>
        
   )
}