# 📱 اپلیکیشن حضور و غیاب

اپلیکیشن مدیریت حضور و غیاب با قابلیت تولید خروجی اندروید

## 🚀 ویژگی‌ها

- ✅ مدیریت حضور و غیاب اعضا
- 👥 مدیریت اطلاعات اعضا
- 📊 گزارش‌گیری تفصیلی
- 🔐 سیستم احراز هویت
- 📱 پشتیبانی از اندروید با Capacitor
- 🤖 یکپارچه‌سازی با Gemini AI

## 🛠️ پیش‌نیازها

- Node.js (نسخه 18 یا بالاتر)
- Java JDK 17 (برای build اندروید)
- Android SDK (برای build اندروید)

## 📦 نصب و راه‌اندازی

### نصب وابستگی‌ها
```bash
npm install
```

### تنظیم متغیرهای محیطی
1. فایل `.env.example` را کپی کرده و نام آن را به `.env.local` تغییر دهید
2. کلید API Gemini خود را در فایل `.env.local` قرار دهید:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### اجرای پروژه

#### حالت توسعه (Web)
```bash
npm run dev
```

#### Build وب
```bash
npm run build
```

## 📱 Build اندروید

### تولید APK Debug
```bash
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

### تولید AAB Release
```bash
npm run build
npx cap sync android
cd android  
./gradlew bundleRelease
```

### اجرای روی دستگاه اندروید
```bash
npm run android:dev
```

## 🔄 GitHub Actions

این پروژه دارای GitHub Actions workflow برای build خودکار اندروید است که:

- ✅ Build خودکار APK و AAB
- 📤 آپلود artifacts در GitHub
- 🔄 اجرا در push و pull request
- 🎨 آیکون‌های سفارشی برای اپلیکیشن

## 📁 ساختار پروژه

```
├── components/          # کامپوننت‌های React
├── hooks/              # Custom hooks
├── services/           # سرویس‌های API و database  
├── utils/              # توابع کمکی
├── android/            # پروژه اندروید Capacitor
├── .github/workflows/  # GitHub Actions
└── dist/              # فایل‌های build شده
```

## 🔧 تکنولوژی‌های استفاده شده

- **Frontend**: React + TypeScript + Vite  
- **Mobile**: Capacitor
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Build**: GitHub Actions

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است.
