import { FC, ReactNode } from "react";
import styles from "../styles/Canvas.module.scss";

interface DoubleControlItemProps {
    onClickLeft?: () => void;
    onClickRight?: () => void;
    childrenLeft: ReactNode;
    childrenRight: ReactNode;
}

const DoubleControlItem: FC<DoubleControlItemProps> = ({
    onClickLeft,
    onClickRight,
    childrenLeft,
    childrenRight,
}) => {
    return (
        <div className={styles.dciWrapper}>
            <div
                className={`${styles.dciLeft} ${styles.doubleControlItem}`}
                onClick={onClickLeft}
            >
                {childrenLeft}
            </div>
            <div
                className={`${styles.dciRight} ${styles.doubleControlItem}`}
                onClick={onClickRight}
            >
                {childrenRight}
            </div>
        </div>
    );
};

DoubleControlItem.displayName = "DoubleControlItem";

export default DoubleControlItem;
