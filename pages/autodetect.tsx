import Head from "next/head";
import { FC } from "react";
import Canvas from "../components/Canvas";

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

            <Canvas size="autodetect" blockSize={50} />
        </>
    );
};

AutoMode.displayName = "AutoModePage";

export default AutoMode;
