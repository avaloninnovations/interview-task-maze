import { MazeCell, useMaze } from "../MazeContext";
import cn from "classnames";

import styles from "./Maze.module.scss";

function Cell({ data }: { data: MazeCell }) {
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
              <Cell key={`${columnIndex}-${cellIndex}`} data={cell} />
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
