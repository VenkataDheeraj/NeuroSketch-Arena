// import { prompts } from './prompts';

// // Simulates CNN model prediction
// export function mockCnnPredict() {
//   const index = Math.floor(Math.random() * prompts.length);
//   return prompts[index];
// }

// // Simulates ViT model prediction
// export function mockVitPredict() {
//   const index = Math.floor(Math.random() * prompts.length);
//   return prompts[index];
// }

// // Simulates Hybrid (CNN + Transformer) model prediction
// export function mockHybridPredict() {
//   const index = Math.floor(Math.random() * prompts.length);
//   return prompts[index];
// }



// mockModel.js

const API_BASE = 'http://localhost:8000'; // Adjust if your backend is deployed

async function sendToModel(drawingDataUrl, modelType) {
  const blob = await (await fetch(drawingDataUrl)).blob();
  const formData = new FormData();
  formData.append('file', blob, 'drawing.png');

  const response = await fetch(`${API_BASE}/predict?model=${modelType}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.label;
}

export async function mockCnnPredict(drawingDataUrl) {
  return await sendToModel(drawingDataUrl, 'cnn');
}

export async function mockVitPredict(drawingDataUrl) {
  return await sendToModel(drawingDataUrl, 'vit');
}

export async function mockHybridPredict(drawingDataUrl) {
  return await sendToModel(drawingDataUrl, 'hybrid');
}