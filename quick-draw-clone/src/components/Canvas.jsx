// src/components/Canvas.jsx
import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

const Canvas = forwardRef(({ onStroke, setIsDrawing }, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const lastPredictionTimeRef = useRef(0);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.width = '400px';
    canvas.style.height = '400px';

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;

    // Set white background initially
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    const now = Date.now();
    if (now - lastPredictionTimeRef.current > 1000) {
      lastPredictionTimeRef.current = now;

      // 🧠 Export with white background
      const canvas = canvasRef.current;
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = canvas.width;
      exportCanvas.height = canvas.height;

      const ctx = exportCanvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvas, 0, 0);

      const drawingData = exportCanvas.toDataURL('image/png');
      onStroke(drawingData);
    }
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setDrawing(false);
    setIsDrawing(false);
  };

  useImperativeHandle(ref, () => ({
    clearCanvas: () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      className="border-2 border-gray-300 bg-white rounded-md shadow-md cursor-crosshair"
    />
  );
});

export default Canvas;