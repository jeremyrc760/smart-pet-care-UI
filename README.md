# 🐾 Smart Pet Care UI

A **React + Vite** based web dashboard for monitoring and controlling a smart pet care system — including **auto feeder, water dispenser, and environment sensors** integrated with Raspberry Pi and PubNub real-time messaging.

---

## 🚀 Features

- 🕹️ **Real-time Dashboard** – Displays live data from Raspberry Pi sensors (feeding, water level, temperature, humidity)
- 🐕 **Modular Design** – Independent React components (FeedCard, WaterCard, EnvCard, CameraCard)
- ☁️ **PubNub Integration** – Real-time publish/subscribe data update
- 📱 **Responsive Layout** – Works across desktop and tablet screens
- 🧩 **Scalable Structure** – Easy to extend for more IoT sensors or actuators

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React 19 + Vite 7 |
| **UI Components** | JSX + CSS Modules |
| **Real-time Data** | PubNub SDK |
| **Backend (planned)** | Node.js / Express API |
| **Hardware Interface** | Raspberry Pi 5 + Python sensor scripts |

---

## ⚙️ Installation & Run

```bash
# 1️⃣ Clone the repository
git clone https://github.com/jeremyrc760/smart-pet-care-UI.git
cd smart-pet-care-UI

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start local dev server
npm run dev
