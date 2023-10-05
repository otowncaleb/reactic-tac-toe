import { Turn } from "@/types";
import { clsx } from "clsx";
import { useState } from "react";
import styles from "./Square.module.scss";

const x = (
	<svg
		viewBox="0 0 100 100"
		width="90%"
		strokeWidth={8}
		className="stroke-black dark:stroke-white"
	>
		<g>
			<line x1="0" y1="0" x2="100" y2="100" />
			<line x1="100" y1="0" x2="0" y2="100" />
		</g>
	</svg>
);

const o = (
	<svg
		viewBox="0 0 100 100"
		strokeWidth={8}
		className="stroke-black dark:stroke-white"
	>
		<circle cx="50" cy="50" r="46" fill="none" />
	</svg>
);

export interface SquareProps {
	whoseTurn: Turn;
	value: Turn;
	positionX: "left" | "middle" | "right";
	positionY: "top" | "middle" | "bottom";
	borderTop?: boolean;
	borderRight?: boolean;
	borderLeft?: boolean;
	borderBottom?: boolean;
	onChoice: () => void;
}
export function Square({
	positionX,
	positionY,
	whoseTurn,
	value,
	onChoice,
}: SquareProps) {
	const [hover, setHover] = useState(false);

	const hoveringOpenSquare = hover && whoseTurn !== "" && value == "";

	let squareContent;
	if (hoveringOpenSquare) {
		squareContent = whoseTurn === "x" ? x : o;
	} else if (value == "") {
		squareContent = "";
	} else {
		squareContent = value === "x" ? x : o;
	}

	const openSquare = whoseTurn !== "" && value === "";
	return (
		<div
			className={clsx(
				"flex aspect-square h-full w-full select-none justify-center border-gray-400",
				positionY !== "top" && "border-t-4",
				positionY !== "bottom" && "border-b-4",
				positionX !== "left" && "border-l-4",
				positionX !== "right" && "border-r-4",
			)}
		>
			<button
				className={clsx(
					"flex h-full w-full items-center justify-center p-[15%]",
					value == "x" && styles.X,
					value == "o" && styles.O,
					hoveringOpenSquare && "opacity-10 dark:opacity-20",
					!hoveringOpenSquare && "cursor-default",
				)}
				onClick={onChoice}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{squareContent}
			</button>
		</div>
	);
}
