import { FC, ReactNode } from "react";
import styles from "../styles/Canvas.module.scss";

interface ControlItemProps {
    onClick?: () => void;
    children: ReactNode;
    isDisplay?: boolean;
}

const ControlItem: FC<ControlItemProps> = ({
    onClick,
    children,
    isDisplay = false,
}) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.controlItem} ${
                isDisplay ? styles.display : styles.button
            }`}
        >
            {children}
        </div>
    );
};

ControlItem.displayName = "ControlItem";

export default ControlItem;
