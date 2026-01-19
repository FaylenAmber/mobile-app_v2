# Mobile App – Construction Worker Attendance System

## Team Development
- **Made Dwi Mahesa Paramaarta** (230040123)  
- **I Kadek Rai Mertha Setyabudhi** (230040150)

## Project Description

Ini adalah aplikasi **Sistem Informasi Absensi Buruh Berbasis Mobile** yang bertujuan membantu perusahaan konstruksi dalam mengelola kehadiran para pekerja lapangan.  
Aplikasi ini dibangun menggunakan **React Native** sebagai Frontend, dan **Express.js** sebagai Backend, dengan fokus pada:

- Pencatatan absensi buruh secara praktis melalui perangkat mobile  
- Monitoring waktu masuk & pulang (clock-in / clock-out)  
- Penyimpanan data pekerja  
- Kemudahan akses bagi admin dan mandor  
- Pengurangan proses manual seperti kertas dan rekap Excel  

Dengan pendekatan mobile app, sistem absensi menjadi lebih fleksibel, cepat, dan akurat dalam mendukung operasional perusahaan konstruksi.

## 🔗 Repository and Youtube Video
- https://github.com/FaylenAmber/mobile-app_v2.git
- https://youtu.be/HMNTRzTeprQ

---

## Project Structure

Proyek ini terdiri dari dua folder utama:
```
mobile-app/
├── frontend/    # React Native application
├── backend/     # Express.js server
└── database/    # .sql file

```

---

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```sh
cd backend
```

### Step 2: Install Dependencies
```sh
npm install
```

### Step 3: Create Database

Jalankan script berikut untuk membuat database dan mengisi dummy data:
```sh
node create_db.js
```

### Step 4: Start Backend Server
```sh
node index.js
```

Server akan berjalan dan siap menerima request dari aplikasi mobile. Pastikan server tetap berjalan saat menggunakan aplikasi frontend.

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```sh
cd frontend
```

### Step 2: Install Dependencies
```sh
# Using npm
npm install

# OR using Yarn
yarn install
```

### Step 3: Start Metro

Jalankan Metro bundler untuk React Native:
```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 4: Build and Run Your App

Dengan Metro yang sudah berjalan, buka terminal baru dan jalankan salah satu command berikut:

#### Android
```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

Untuk iOS, install CocoaPods dependencies terlebih dahulu (hanya perlu dijalankan sekali atau setelah update native dependencies):
```sh
# Install Ruby bundler (first time only)
bundle install

# Install pods
bundle exec pod install
```

Kemudian jalankan aplikasi:
```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

Jika semuanya sudah dikonfigurasi dengan benar, aplikasi akan berjalan di Android Emulator, iOS Simulator, atau perangkat fisik yang terhubung.

---

## Development

### Modify Your App

Buka `App.tsx` di text editor pilihan Anda dan lakukan perubahan. Aplikasi akan otomatis ter-update berkat fitur [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

Untuk reload paksa:

- **Android**: Tekan tombol <kbd>R</kbd> dua kali atau pilih **"Reload"** dari **Dev Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> untuk Windows/Linux atau <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> untuk macOS)
- **iOS**: Tekan <kbd>R</kbd> di iOS Simulator

---

## Troubleshooting

Jika mengalami masalah saat menjalankan aplikasi, silakan lihat halaman [Troubleshooting](https://reactnative.dev/docs/troubleshooting) React Native.

---

## Learn More

Untuk mempelajari lebih lanjut tentang React Native dan Express.js:

### React Native Resources
- [React Native Website](https://reactnative.dev)
- [Getting Started](https://reactnative.dev/docs/environment-setup)
- [Learn the Basics](https://reactnative.dev/docs/getting-started)
- [React Native Blog](https://reactnative.dev/blog)
- [React Native GitHub Repository](https://github.com/facebook/react-native)

### Express.js Resources
- [Express.js Official Documentation](https://expressjs.com/)
- [Express.js Getting Started](https://expressjs.com/en/starter/installing.html)

---

## Congratulations! 🎉

Anda telah berhasil menjalankan aplikasi Construction Worker Attendance System! 🎊