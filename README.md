# 📅 Interactive Wall Calendar Component

A polished, responsive React/Next.js calendar component inspired by a physical wall calendar design. This component blends aesthetics with functionality, featuring a hero image, date range selection, and an integrated notes section.

---

## 🚀 Features

### 🎨 Wall Calendar Aesthetic

* Spiral binding effect at the top
* Hero image with angled overlay
* Month and year displayed over the image
* Clean, print-inspired layout

### 📆 Date Range Selection

* Click to select **start date**
* Click again to select **end date**
* Visual states:

  * Start date (highlighted)
  * End date (distinct highlight)
  * Range (soft background)

### 📝 Notes Section

* Minimal lined notes area inspired by physical calendars
* Can be extended to support editable notes

### 📱 Fully Responsive

* Mobile-first design
* Stacked layout on small screens
* Compact grid for better usability on touch devices

---

## 🛠 Tech Stack

* **React / Next.js**
* **Tailwind CSS**
* **date-fns** for date utilities

---

## 📦 Installation

```bash
npm install date-fns
```

If using Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## ▶️ Usage

Import and use the component:

```jsx
import WallCalendar from "./WallCalendar";

export default function Page() {
  return <WallCalendar />;
}
```

---

## 🧠 Component Behavior

### Date Selection Logic

* First click → sets `startDate`
* Second click → sets `endDate`
* Clicking again resets selection

### Month Navigation

* Uses `addMonths()` from date-fns
* "Prev" and "Next" buttons update the current view

---

## 🎯 Design Decisions

* **Minimal UI** to match physical calendar feel
* **Compact grid** for readability
* **Soft color palette** for better UX
* **Visual hierarchy** prioritizing image and month

---

## ✨ Possible Enhancements

* Drag-to-select date ranges
* Editable notes with persistence (localStorage / backend)
* Theme adaptation based on hero image
* Holiday/event indicators
* Page flip animations for month transitions

---

## 📁 Project Structure

```
/components
  └── WallCalendar.jsx
```

---

## 🧪 Future Improvements

* Add TypeScript support
* Improve accessibility (ARIA roles, keyboard navigation)
* Add unit tests (Jest / React Testing Library)

---

## 📸 Inspiration

This component is inspired by a modern wall calendar layout featuring:

* Strong visual imagery
* Structured date grid
* Integrated notes section

---

## 🏁 Conclusion

This project demonstrates the ability to:

* Translate static design into a functional UI
* Build responsive layouts
* Implement interactive date selection logic
* Balance design and usability

---

## 👨‍💻 Author

Frontend Engineering Challenge Submission
