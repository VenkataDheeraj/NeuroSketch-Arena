# NeuroSketch Arena 🎨🤖

NeuroSketch Arena is an interactive web-based real-time sketch recognition game built using multiple deep learning models: a **Convolutional Neural Network (CNN)**, a **Vision Transformer (ViT)**, and a **Hybrid CNN+Transformer**.

The project allows users to draw quick sketches on a canvas, and three models simultaneously attempt to recognize the drawing. If at least **two out of three models** predict correctly, the round is considered a success!

This project demonstrates real-world deployment of deep learning models integrated with an interactive frontend (React + Vite) and a backend (FastAPI + TensorFlow).

---

## ✨ Features
- Trained models on **60 sketch classes** from the QuickDraw dataset.
- **Real-time** prediction using CNN, ViT, and Hybrid models.
- **Frontend**: React.js + Tailwind CSS (Vite project)
- **Backend**: FastAPI (TensorFlow models served)
- **Preprocessing pipeline**: Real-time image enhancement before prediction.
- **Majority voting**: Proceed only if two models predict correctly.

---

## 📁 Project Structure
```
Project/
├── Dataset and code/                # Notebooks and training data info
│   ├── main.ipynb                   # Training and evaluation notebook
│   ├── data_download.ipynb           # Script to download QuickDraw dataset
│   ├── model_accuracies_5000.csv     # Model accuracies with 5000 samples per class
│   ├── model_accuracies_10000.csv    # Model accuracies with 10000 samples per class
│   ├── categories.txt, categories_60.txt     # categories.txt lists all 340+ classes in the quickdraw dataset, categories_60.txt lists the 60 categories used in this project
│   ├── accuracies_plot.ipynb
│
├── quick-draw-clone/                 # Fullstack Web Application
│   ├── backend/                      # FastAPI backend
│   │   ├── main.py                   # FastAPI app serving models
│   │   ├── model/                    # Saved .keras models
│   │
│   ├── public/                       # Static public assets
│   ├── src/                          # React frontend source code
│   │   ├── components/, utils/, pages/, assets/
│
├── .gitignore
```

---

## 🚀 Installation and Running Instructions

### Backend Setup
1. Navigate into the backend folder:
   ```bash
   cd quick-draw-clone/backend
   ```

2. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will run at: `http://127.0.0.1:8000`

---

### Frontend Setup
1. Navigate into the frontend folder:
   ```bash
   cd quick-draw-clone
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be available typically at: `http://localhost:5173`

---

## 📦 Dataset Information
- Dataset used: [Google QuickDraw Dataset](https://quickdraw.withgoogle.com/data)
- 60 selected categories.
- 10,000 samples per class.

⚡ **Note**: Dataset files (`.npy`) are large and not included in GitHub repo.  
However, the `data_download.ipynb` script can be used to download required categories.

---

## 📊 Evaluation
- Models evaluated on held-out test sets.
- Hybrid model achieved the highest accuracy: **85.27%**
- CNN and ViT models also achieved strong performances.

---

## 👨‍💻 Team Contributions
- **Venkata Dheeraj Bhogi**: Data downloading, preprocessing, Hybrid model development.
- **Amirthavarshani Mahadevan**: CNN model development and training.
- **Shiva Madhav Adusumilli**: ViT model development and optimization.
- **Frontend**: Collaborative development by all team members.

---

## License

This project was developed as part of an academic course at Georgia State University.  
It is intended solely for educational and research purposes.  
The QuickDraw dataset is owned and maintained by Google and is used here under fair academic use.
