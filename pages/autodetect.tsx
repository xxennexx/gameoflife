import Head from "next/head";
import { FC } from "react";
import Canvas from "../components/Canvas";
import styles from "../styles/Canvas.module.scss";

const AutoMode: FC = () => {
    return (
        <>
            <Head>
                <title>Game of Life - auto size</title>
                <meta
                    name="description"
                    content="The game of life, made with Next.js"
                />
                <link rel="icon" href="/logo.svg" />
                <link rel="icon" href="/logo.png" />
            </Head>

            <div className={styles.autoCanvasWrapper}>
                <Canvas size="autodetect" blockSize={50} />
            </div>
        </>
    );
};

AutoMode.displayName = "AutoModePage";

export default AutoMode;
