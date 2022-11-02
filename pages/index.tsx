import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Index.module.scss";

export default function App() {
    return (
        <>
            <Head>
                <title>Game of Life</title>
                <meta
                    name="description"
                    content="The game of life, made with Next.js"
                />
                <link rel="icon" href="/logo.svg" />
                <link rel="icon" href="/logo.png" />
            </Head>

            <div className={styles.centerText}>
                <Image
                    className={styles.logo}
                    src="/logo.svg"
                    alt="Logo"
                    width={50}
                    height={50}
                />
                <div className={styles.title}>John Conway's Game of Life</div>
                <div className={styles.subtitle}>
                    Made with{" "}
                    <a
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Next.js
                    </a>{" "}
                    by{" "}
                    <a
                        href="https://github.com/xxennexx"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        xenex
                    </a>
                </div>
                <br />
                <div className={styles.mainContent}>
                    <div>The React component supports 3 modes:</div>
                    <div className={styles.list}>
                        • <Link href="/fixed">Fixed size</Link>
                        <br />• <Link href="/autodetect">
                            Automatic size
                        </Link>{" "}
                        (fits the grid to the screen)
                        <br />• <Link href="/infinite">Infinite size</Link> (not
                        fully implemented yet)
                    </div>
                </div>
            </div>
        </>
    );
}
