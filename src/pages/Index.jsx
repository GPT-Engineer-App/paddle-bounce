import { Box, Button, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [paddle1Y, setPaddle1Y] = useState(50);
  const [paddle2Y, setPaddle2Y] = useState(50);
  const [ballDirection, setBallDirection] = useState({ x: 2, y: 1 });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const gameAreaRef = useRef(null);

  const gameHeight = 300;
  const gameWidth = 600;
  const paddleHeight = 60;
  const paddleWidth = 10;
  const ballSize = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setBallPosition((prev) => ({
        x: prev.x + ballDirection.x,
        y: prev.y + ballDirection.y,
      }));

      // Ball collision with top or bottom
      if (ballPosition.y <= 0 || ballPosition.y >= gameHeight - ballSize) {
        setBallDirection((prev) => ({ x: prev.x, y: -prev.y }));
      }

      // Ball collision with paddles
      if ((ballPosition.x <= paddleWidth && ballPosition.y >= paddle1Y && ballPosition.y <= paddle1Y + paddleHeight) || (ballPosition.x >= gameWidth - paddleWidth - ballSize && ballPosition.y >= paddle2Y && ballPosition.y <= paddle2Y + paddleHeight)) {
        setBallDirection((prev) => ({ x: -prev.x, y: prev.y }));
      }

      // Scoring
      if (ballPosition.x <= 0) {
        setScores((prev) => ({ ...prev, player2: prev.player2 + 1 }));
        resetBall();
      } else if (ballPosition.x >= gameWidth - ballSize) {
        setScores((prev) => ({ ...prev, player1: prev.player1 + 1 }));
        resetBall();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [ballPosition, ballDirection]);

  const resetBall = () => {
    setBallPosition({ x: 50, y: 50 });
    setBallDirection({ x: 2, y: 1 });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        movePaddle(1, -1);
      } else if (event.key === "ArrowDown") {
        movePaddle(1, 1);
      } else if (event.key === "ArrowLeft") {
        movePaddle(2, -1);
      } else if (event.key === "ArrowRight") {
        movePaddle(2, 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const movePaddle = (paddle, direction) => {
    if (paddle === 1) {
      setPaddle1Y((prev) => Math.max(0, Math.min(gameHeight - paddleHeight, prev + direction * 20)));
    } else {
      setPaddle2Y((prev) => Math.max(0, Math.min(gameHeight - paddleHeight, prev + direction * 20)));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        movePaddle(1, -1);
      } else if (event.key === "ArrowDown") {
        movePaddle(1, 1);
      } else if (event.key === "ArrowLeft") {
        movePaddle(2, -1);
      } else if (event.key === "ArrowRight") {
        movePaddle(2, 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container centerContent maxW="container.xl">
      <VStack spacing={4}>
        <Text fontSize="2xl">Ping Pong Game</Text>
        <Flex justifyContent="space-between" width="100%">
          <Button onClick={() => movePaddle(1, -1)}>Up</Button>
          <Button onClick={() => movePaddle(1, 1)}>Down</Button>
          <Button onClick={() => movePaddle(2, -1)}>Up</Button>
          <Button onClick={() => movePaddle(2, 1)}>Down</Button>
        </Flex>
        <Box ref={gameAreaRef} position="relative" width={`${gameWidth}px`} height={`${gameHeight}px`} bg="gray.200">
          <Box position="absolute" left={`${ballPosition.x}px`} top={`${ballPosition.y}px`} width={`${ballSize}px`} height={`${ballSize}px`} bg="black" borderRadius="50%" />
          <Box position="absolute" left="0" top={`${paddle1Y}px`} width={`${paddleWidth}px`} height={`${paddleHeight}px`} bg="blue.500" />
          <Box position="absolute" right="0" top={`${paddle2Y}px`} width={`${paddleWidth}px`} height={`${paddleHeight}px`} bg="green.500" />
        </Box>
        <Text>
          Score: Player 1: {scores.player1} - Player 2: {scores.player2}
        </Text>
      </VStack>
    </Container>
  );
};

export default Index;
