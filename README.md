# Book-Portal
A full-stack web application that provides a platform for managing and exploring books, designed for both administrators and end-users.


Book Portal

Welcome to the Book Portal! This project is a full-stack web application that allows administrators and users to manage and explore a collection of books. The application is designed with Spring MVC for the backend and ReactJS for the frontend, providing a smooth and user-friendly experience.



Features

Admin capabilities include logging in to the system with admin privileges, adding, updating, and deleting books, users, authors, and other entities, and searching for books and users within the system.

User capabilities include logging in to the system as a standard user, viewing a list of available books, adding books to a personal reading list or favorite list, and searching for books by name or other criteria.



Technologies Used

The backend is developed using Java with Spring MVC, Spring Security, Hibernate, and JPA. The frontend is built using ReactJS. The application uses an SQL database, configured via JPA with database details stored in a properties file. Testing is done using Postman for API testing and React Testing Library for frontend tests.



Installation

To set up the project, first clone the repository and navigate to the project directory.

Clone the Repository: (Clone the repository by running the command git clone https://github.com/yourusername/book-portal.git and navigate to the project directory using cd book-portal.)

Backend Setup: (For the backend setup, navigate to the backend directory. Configure the database connection in the application.properties file. Then, run the application using your IDE or command line with the command "mvn spring-boot:run".)

Frontend Setup: (For the frontend setup, navigate to the frontend directory. Install the necessary dependencies using "npm install". After that, start the React development server with the command "npm start".)
Usage

For admin access, use admin credentials to log in and manage the system, including adding, updating, and deleting books and users. For user access, regular users can log in to explore books, add them to their reading or favorite lists, and perform searches. Testing of the backend can be done using Postman or similar tools to test API endpoints, and the frontend can be tested using the provided testing suite.



Project Structure

The backend, developed in Java with Spring MVC, includes the src/main/java directory containing the models, controllers, services, and repositories, and the src/main/resources directory containing configuration files, including the application.properties file.

The frontend, built with ReactJS, includes the src/components directory containing React components for the user interface, and the src/services directory containing services for API calls.



License

This project is licensed under the MIT License. Please see the LICENSE file for more details.
