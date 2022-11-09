import { FC } from 'react';
import styles from './style.module.scss';

export interface ButtonProps {
    name?: string;
    age?: number;
}
export const Button: FC<ButtonProps> = () => {
    return <button className={styles.color}>click</button>;
};

export default Button;
