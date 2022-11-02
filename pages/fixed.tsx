import Head from "next/head";
import { FC } from "react";
import Canvas from "../components/Canvas";
import styles from "../styles/Canvas.module.scss";

const FixedMode: FC = () => {
    return (
        <>
            <Head>
                <title>Game of Life - fixed size</title>
                <meta
                    name="description"
                    content="The game of life, made with Next.js"
                />
                <link rel="icon" href="/logo.svg" />
                <link rel="icon" href="/logo.png" />
            </Head>

            <div className={styles.fixedCanvasWrapper}>
                <Canvas size="fixed" width={10} height={10} blockSize={50} />
            </div>
        </>
    );
};

FixedMode.displayName = "FixedModePage";

export default FixedMode;
