import {Button} from '@mui/material';
import styles from './Button.module.css';


export function PrimaryButton (props) {
  return <Button variant="contained" color="primary" id={styles.button} {...props} />;
}