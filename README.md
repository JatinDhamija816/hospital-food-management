# Hospital Food Manager (HFM)

A comprehensive system designed to streamline meal preparation and delivery in hospitals, ensuring efficient task assignments, and a clean database structure.

---

## Features

### **Admin**
- Add, update, and delete **Patients**, **Diet Charts**, **Pantry Staff**, **Riders**, and **Assigned Meals**.
- Monitor task statuses and workflow.
- Assign tasks (meals) to Pantry Staff and Riders.
- Automatically delete completed deliveries from the database.

### **Pantry Staff**
- View assigned tasks and detailed patient diet charts.
- Update task statuses from "Pending" to "In-Progress" to "Cooked."

### **Rider**
- View assigned delivery tasks with patient details (e.g.,  bed number, room number, floor number, contact info).
- Update delivery statuses from "Pending" to "Picked" to "Delivered."
- Automatically switch to "Free" status after a successful delivery.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JatinDhamija816/hospital-food
   ```

2. **Install dependencies**:
   ```bash
   # Install backend dependencies
   cd ../server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up the `.env` file with your environment variables**.
  ```bash
  PORT=8000
  MONGODB_URI=your_mongodb_connection_string
  JWT_ACCESS_SECRET=your_jwt_access_secret
  JWT_REFRESH_SECRET=your_jwt_refresh_secret
  ACCESS_TOKEN_EXPIRY=3600000
  REFRESH_TOKEN_EXPIRY=604800000
  
  ACCESS_TOKEN_EXPIRY_STR=1h
  REFRESH_TOKEN_EXPIRY_STR=7d
  
  NODE_ENV=development
  ```

4. **Run the application**:
   ```bash
   # Start the backend server
   cd ../server
   npm start

   # Start the client server
   cd ../client
   npm start
   ```
---

## Usage

### **Admin**
- Navigate to the admin dashboard.
- Add or update details for patients, diet charts, pantry staff, and riders.
- Assign meals to pantry staff and riders.
- Monitor task statuses in real-time.

### **Pantry Staff**
- Log in to view assigned meal preparation tasks.
- Update preparation status to keep the system updated.

### **Rider**
- Log in to view delivery tasks.
- Update delivery status to ensure meal delivery tracking.

---

## Live Link
Access the application live at: [Hospital Food Manager Live Link](https://hospital-food-management-tau.vercel.app/)

---

## Postman Collection
To test the API endpoints, import the [Postman Collection](https://hospital-food-management.postman.co/workspace/hospital-food-management-Worksp~0a9ad450-1a7b-4bb1-a98f-825ac6d35815/request/33183162-12a54025-5bdd-4b90-aab2-5b88735eda79) into Postman.

---

## API Endpoints

### Admin
- Add, update, or delete **Patients**, **Pantry Staff**, and **Riders**.
- Assign meals to Pantry Staff and Riders.
- Monitor real-time task statuses.

### Pantry Staff
- Fetch assigned meal preparation tasks.
- Update preparation statuses.

### Rider
- Fetch assigned delivery tasks.
- Update delivery statuses.

---

## Database Structure

### **Pantry Staff**
- Name, Contact Info, Email, Password, Location.
- Assigned Task (Meal Type, Details, Patient Info, Preparation Status).
- Status (Free/Busy).

### **Rider**
- Name, Contact Info, Email, Password.
- Assigned Task (Delivery Status).
- Status (Free/Busy).

### **Patient**
- Name, Disease, Allergies, Age, Room Number, Bed Number, Floor Number, Gender, Contact, Emergency Contact.
- Diet Chart (Meal Type, Ingredients, Instructions).

### **Assigned Meals**
- Links Pantry Staff, Rider, and Patient.
- Tracks meal preparation and delivery statuses.

---

## Notes  
- After adding, updating, or deleting data, click the "HFM" logo or refresh the page to reflect the latest changes.  
- Successfully delivered meals are automatically removed from the database for a clean and efficient system.  

---

## Contributing
1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add YourFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License.
