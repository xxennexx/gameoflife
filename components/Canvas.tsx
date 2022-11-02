import { Component } from "react";
import styles from "../styles/Canvas.module.scss";
import ControlItem from "./ControlItem";
import DoubleControlItem from "./DoubleControlItem";
import Image from "next/image";

interface CanvasProps {
    size: "fixed" | "autodetect" | "infinite";
    width?: number;
    height?: number;
    blockSize: number;
}

interface CanvasState {
    blocks: boolean[][];
    running: boolean;
    delay: number;
    width: number;
    height: number;
}

class Canvas extends Component<CanvasProps, CanvasState> {
    public static displayName = "Canvas";

    public state: CanvasState = {
        blocks: [],
        running: false,
        delay: 100,
        height: 0,
        width: 0,
    };

    private timeoutId = 0;
    private clicked = 0;
    private emptyBlocks: boolean[][] = [];

    constructor(props: CanvasProps) {
        super(props);

        if (props.size === "infinite") {
            this.state.width = 100;
            this.state.height = 100;
            this.clearBlocks(100, 100, true);
        } else if (props.size === "fixed") {
            if (!props.width || !props.height)
                throw new Error(
                    "Width and height must be specified for fixed size canvas",
                );

            this.state.width = props.width;
            this.state.height = props.height;

            this.clearBlocks(props.width, props.height, true);
        }
    }

    componentDidMount() {
        if (this.props.size === "autodetect") {
            const height = Math.floor(
                (window.innerHeight - this.props.blockSize / 10) /
                    this.props.blockSize,
            );
            const width = Math.floor(
                (window.innerWidth - this.props.blockSize / 10) /
                    this.props.blockSize,
            );

            this.setState({ width, height });
            this.clearBlocks(width, height);
        }
    }

    private start() {
        this.timeoutId = +setTimeout(this.tick.bind(this), this.state.delay);
        this.setState({ running: true });
    }

    private stop() {
        clearTimeout(this.timeoutId);
        this.setState({ running: false });
    }

    private tick(step = false) {
        const { width, height } = this.state;

        if (this.clicked > 0) {
            const newBlocks = this.emptyBlocks.map((x) => x.slice());

            for (let y = 0; y < height; y++)
                for (let x = 0; x < width; x++) {
                    const neighbors = this.calculateNeighbors(x, y);

                    if (
                        (this.state.blocks[y][x] &&
                            [2, 3].includes(neighbors)) ||
                        (!this.state.blocks[y][x] && neighbors === 3)
                    )
                        newBlocks[y][x] = true;
                }

            this.setState({ blocks: newBlocks });
        }

        if (!step)
            this.timeoutId = +setTimeout(
                this.tick.bind(this),
                this.state.delay,
            );
    }

    public calculateNeighbors(x: number, y: number) {
        const { width, height } = this.state;

        let neighbors = 0;

        const dirs = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
        ];

        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            const x1 = x + dir[0];
            const y1 = y + dir[1];

            if (
                x1 >= 0 &&
                x1 < width &&
                y1 >= 0 &&
                y1 < height &&
                this.state.blocks[y1][x1]
            )
                neighbors++;
        }

        return neighbors;
    }

    private clearBlocks(width?: number, height?: number, cctor = false) {
        if (width && height) {
            const blocks: boolean[][] = [];

            for (let y = 0; y < height; y++) {
                blocks[y] = [];
                for (let x = 0; x < width; x++) {
                    blocks[y][x] = false;
                }
            }

            this.emptyBlocks = blocks;
        }

        if (cctor) this.state.blocks = this.emptyBlocks.map((x) => x.slice());
        else this.setState({ blocks: this.emptyBlocks.map((x) => x.slice()) });
    }

    private onClick(x: number, y: number) {
        const blocks = this.state.blocks;

        if (this.state.blocks[y][x]) this.clicked--;
        else this.clicked++;

        blocks[y][x] = !blocks[y][x];
        this.setState({ blocks });
    }

    render() {
        const { blockSize } = this.props;
        const { width, height } = this.state;

        // Waiting for width and height to be set (autodetect)
        if (width === height && height === 0) return "Loading...";

        return (
            <>
                <div className={styles.canvasControls}>
                    {this.state.running ? (
                        <ControlItem onClick={() => this.stop()}>
                            Stop
                        </ControlItem>
                    ) : (
                        <ControlItem onClick={() => this.start()}>
                            Start
                        </ControlItem>
                    )}
                    <ControlItem onClick={() => this.tick(true)}>
                        Step
                    </ControlItem>
                    <ControlItem onClick={() => this.clearBlocks()}>
                        Clear
                    </ControlItem>
                    <ControlItem isDisplay>
                        Delay: {this.state.delay}ms
                    </ControlItem>
                    <DoubleControlItem
                        onClickLeft={() =>
                            this.setState({ delay: this.state.delay + 10 })
                        }
                        childrenLeft={
                            <Image
                                src="/plus.svg"
                                alt="Plus icon"
                                width={15}
                                height={15}
                            />
                        }
                        onClickRight={() =>
                            this.setState({ delay: this.state.delay - 10 })
                        }
                        childrenRight={
                            <Image
                                src="/minus.svg"
                                alt="Minus icon"
                                width={15}
                                height={15}
                            />
                        }
                    />
                </div>
                <div
                    className={styles.canvas}
                    style={{
                        gridTemplateRows: `repeat(${height}, ${blockSize}px)`,
                        gridTemplateColumns: `repeat(${width}, ${blockSize}px)`,
                    }}
                >
                    {this.state.blocks.map((row, y) =>
                        row.map((active, x) => (
                            <div
                                key={x + y}
                                className={styles.block}
                                style={{
                                    width: this.props.blockSize,
                                    height: this.props.blockSize,
                                    backgroundColor: active ? "white" : "black",
                                }}
                                onClick={() => this.onClick(x, y)}
                            />
                        )),
                    )}
                </div>
            </>
        );
    }
}

export default Canvas;
