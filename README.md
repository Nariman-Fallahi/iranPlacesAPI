# 🇮🇷 Iran Places API

وب‌سرویس کامل و رایگان برای دریافت لیست استان‌ها و شهرهای ایران، به همراه موقعیت جغرافیایی هر کدام.

**Base URL:** `https://iran-places-api.onrender.com`

---

## 📚 فهرست Endpoint ها

### استان‌ها

- **GET** `/api/provinces`  
  دریافت لیست تمام استان‌ها

- **GET** `/api/provinces/id/{id}`  
  دریافت استان بر اساس آیدی

- **GET** `/api/provinces/name/{name}`  
  دریافت استان بر اساس نام

- **GET** `/api/provinces/id/{id}/cities`  
  دریافت تمام شهرهای یک استان (با آیدی)

- **GET** `/api/provinces/name/{name}/cities`  
  دریافت تمام شهرهای یک استان (با نام)

### شهرها

- **GET** `/api/cities`  
  دریافت لیست تمام شهرها

- **GET** `/api/cities/id/{id}`  
  دریافت شهر بر اساس آیدی

- **GET** `/api/cities/name/{name}`  
  دریافت شهر بر اساس نام

- **GET** `/api/cities/id/{id}/province`  
  دریافت استان مربوط به یک شهر (با آیدی شهر)

- **GET** `/api/cities/name/{name}/province`  
  دریافت استان مربوط به یک شهر (با نام شهر)

---

## 🚀 مثال استفاده

### دریافت لیست استان‌ها

```bash
curl https://iran-places-api.onrender.com/api/provinces
```

### دریافت اطلاعات یک شهر

```bash
curl https://iran-places-api.onrender.com/api/cities/name/تهران
```

---

## 🙏 تشکر ویژه

داده‌های استان‌ها و شهرها با استفاده از اطلاعات [این ریپازیتوری](https://github.com/sajaddp/list-of-cities-in-Iran) گردآوری شده‌اند.

از توسعه‌دهندگان این پروژه بابت در دسترس قرار دادن این داده‌ها سپاسگزارم. 🌟

---

## 💡 نکته

مختصات جغرافیایی (Latitude و Longitude) استان‌ها و شهرها با کمک هوش مصنوعی (ChatGPT) به داده‌ها اضافه شده‌اند.
