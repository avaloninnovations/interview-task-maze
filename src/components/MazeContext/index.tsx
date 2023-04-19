import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type MazeCell = {
  isStart: boolean;
  isVisited: boolean;
  isEnd: boolean;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  }
};

interface MazeContextData {
  maze: MazeCell[][];
  generateMaze: () => void;
}

const MazeContext = createContext<MazeContextData | undefined>(undefined);

const createMaze = (): MazeCell[][] => {
  const maze: MazeCell[][] = [];

  for (let x = 0; x < 10; x++) {
    const column: MazeCell[] = [];

    for (let y = 0; y < 10; y++) {
      const cell: MazeCell = {
        isStart: x === 0 && y === 0,
        isEnd: x === 9 && y === 9,
        isVisited: false,
        walls: {
          top: true,
          right: true,
          bottom: true,
          left: true,
        }
      };

      column.push(cell);
    }

    maze.push(column);
  }

  return maze;
};

const randomizeMaze = (maze: MazeCell[][]) => {
  // TODO: Generate a random maze

  return maze;
}

export const MazeProvider = ({ children }: PropsWithChildren) => {
  const [maze, setMaze] = useState<MazeCell[][]>([]);

  const generateMaze = () => {
    const newMaze = createMaze();

    randomizeMaze(newMaze);

    setMaze(newMaze);
  };

  useEffect(() => {
    generateMaze();
  }, [])

  return (
    <MazeContext.Provider value={{ maze, generateMaze }}>
      {children}
    </MazeContext.Provider>
  );
};

export const useMaze = () => {
  const context = useContext(MazeContext);
  if (!context) {
    throw new Error("useMaze must be used within a MazeProvider");
  }
  return context;
};
