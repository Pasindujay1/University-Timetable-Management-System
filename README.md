To run test cases - npm test test/filename
Common Details 

Base  URL :  http://localhost:3000/api

1.	User Roles and Authentication:

#	Registration
End point: http://localhost:3000/api/register


Body: {
    "email":"admin@gmail.com",
    "password":"admin",
    "role":"Admin"
}


#	Login
End point: http://localhost:3000/api/login
Body: {
    "email":"admin@gmail.com",
    "password":"admin12345"
}

2.	Course Management:

#	Create Course

End point: http://localhost:3000/api/createCourse
Body: {    
    "name":"Sound Engineering",
    "code":"S001",
    "description":"Welcome to Sound Engineering",
    "credits":"3",
    "faculty":"FOA"
}


#	Get Course

End point: http://localhost:3000/api/getCourse
Body: {    
    "code":"S001"
}
#	Update Course

End point: http://localhost:3000/api/editCourse
Body: {    
    
}


#	Delete Course

End point: http://localhost:3000/api/deleteCourse
Body: {    
    "code":"S001”
}
3.	Timetable Management:

#	Create TimeTable

End point: http://localhost:3000/api/createTimetable
Body: {    
    "courseCode":"SE001",
    "createdBy":"PASINDU"
}
#	Update TimeTable

End point: http://localhost:3000/api/editTimetable/:id
Ex:- http://localhost:3000/api/editTimetable/ 660006847fc3c5dc7e349483
Body: {    
   "courseCode":"SE001",
    "createdBy":"PASINDU3"
}


#	 Create Lecture Session

End point: http://localhost:3000/api/createLectureSession
Body: {    
   "dayOfTheWeek":"tuesday",
   "startTime":"2.00PM",
   "endTime":"4.00PM",
   "roomCode":"ROOM01",
   "courseCode":"SE001"

}


#	Update LectureSession

End point: http://localhost:3000/api/updateLectureSession/:id
Ex:- http://localhost:3000/api/updateLectureSession/660009092ae5d5f73a4388a1
Body: {    
   "dayOfTheWeek":"friday",
   "startTime":"1.00PM",
   "endTime":"4.00PM",
   "roomCode":"ROOM01",
   "courseCode":"SE001"

}





#	Delete LectureSession


End point: http://localhost:3000/api/deleteLectureSession/:id
Ex:- http://localhost:3000/api/deleteLectureSession/660007e97fc3c5dc7e34948c
Body: {   
}
4.	Room and Resource Booking:
#	Create Booking
End point: http://localhost:3000/api/createBooking
Body: {    
  "roomId": "65ff24d084265dd70675dfbf",
  "date": "2024/03/24",
  "startTime": "09:00",
  "endTime": "11:00",
  "purpose": "Team Meeting"
}
#	Get all Bookings

End point: http://localhost:3000/api/getAllBooking
Body: {    
}
#	Get Booking by ID
 End point(GET): http://localhost:3000/api/booking/:bookingID
Ex:- http://localhost:3000/api/booking/ACHP10003

Body: {    
}
#	Delete Booking
End point(DELETE): http://localhost:3000/api/booking/:bookingID
Ex:- http://localhost:3000/api/booking/ACHP10003

Body: {    
}







5.	Student Enrollment
#	Create Student

End point: http://localhost:3000/api/student
Body: {       
  "name": "Kalum", 
  "age": "22", 
  "email": "pasindu@gmail.com",
  "phone":"0773336989",
  "FacultyId":"65fc7b9dbfe5ba3feb6d3c71"
}
#	Get Students

End point(GET): http://localhost:3000/api/students
Body: {      
}
#	Get Student by ID

End point(GET): http://localhost:3000/api/student/:ID
Ex:- http://localhost:3000/api/student/66004db0b9ae7d4bb82f37a3

Body: {    
}






#	Update Student

End point(PUT): http://localhost:3000/api/student/:ID
Ex:- http://localhost:3000/api/student/66004db0b9ae7d4bb82f37a3

Body: {
  "name": "Sugath", 
  "age": "22", 
  "email": "pasindu@gmail.com",
  "phone":"0773336989",
  "FacultyId":"65fc7b9dbfe5ba3feb6d3c71"
    
}
#	Delete Student

End point(DELETE): http://localhost:3000/api/student/:ID
Ex:- http://localhost:3000/api/student/66004db0b9ae7d4bb82f37a3

Body: {
}

#	Enroll a new Student

End point(POST): http://localhost:3000/api/addStudentEnrollment

Body: {
    "student":"66004db0b9ae7d4bb82f37a3",
    "course":"660059e5af385d60110dea71",
    "enrollmentKey":"EN02
}
#	Get Student Enrollments by ID

End point(GET): http://localhost:3000/api/getStudentEnrollments/:student
Ex:- http://localhost:3000/api/getStudentEnrollments/66004db0b9ae7d4bb82f37a3


#	Get all Enrollments

End point(GET): http://localhost:3000/api/getALlEnrollmudents
Body: {
}
#	Delete Student Enrollment

End point(GET): http://localhost:3000/api/deleteEnrollment/:course/:student
	Ex:- http://localhost:3000/api/deleteEnrollment/660059e5af385d60110dea71/66004db0b9ae7d4bb82f37a3


Body: {
}
#	Delete Student Enrollment

End point(GET): http://localhost:3000/api/getUNiTimetable
	Ex:- 
Body: {
}





















