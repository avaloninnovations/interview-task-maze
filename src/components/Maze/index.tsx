import { MazeCell, useMaze } from "../MazeContext";
import cn from "classnames";

import styles from "./Maze.module.scss";

function Cell({ data, x, y }: { data: MazeCell, x: number, y: number}) {
  return (
    <div className={cn(styles.cell, {
      [styles.start]: data.isStart,
      [styles.end]: data.isEnd,
    })}></div>
  );
}

function Maze() {
  const { maze } = useMaze();

  const renderMaze = () => {
    return (
      <>
        {maze.map((column, columnIndex) => {
          return column.map((cell, cellIndex) => {
            return (
              <Cell key={`${columnIndex}-${cellIndex}`} x={columnIndex} y={cellIndex} data={cell} />
            );
          })
        })}
      </>
    );
  };

  return (
    <div className={styles.mazeContainer}>
      {renderMaze()}
    </div>
  );
}

export default Maze;
