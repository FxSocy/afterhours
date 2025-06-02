import { Card } from '@blueprintjs/core';
import styles from "./MFCanvas.module.scss"

const MFCanvas = () => {
  return (
    <div className={styles.canvas_root}>
      <Card className={styles.canvas_main}>This will be a canvas eventually</Card>
    </div>)
}

export default MFCanvas