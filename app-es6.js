class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 1000)
        this.title = title
        this.instructor = instructor
        this.image = image
    }
}

// class Uİ
class UI {
    addCourseToList(course) {
        const list = document.getElementById("course-list")
        var html = `
   <tr>
      <td> <img width="50" src="images/${course.image}" alt="">   </td> 
      <td>${course.title}</td>
      <td>${course.instructor}</td>
      <td><a href="#" data-id="${course.courseId}" class=" btn btn-danger btn-sm delete">Delete</a></td>
   </tr>
    `
        list.innerHTML += html
    }

    clearControls() {
        const title = document.getElementById("title").value = ""
        const instructor = document.getElementById("instructor").value = ""
        const image = document.getElementById("image").value = ""
    }

    deleteCourse(element) {
        if (element.classList.contains("delete")) {
            element.parentElement.parentElement.remove()
        }
    }

    showAlert(message, className) {
        var alert =
            `
      <div class="alert alert-${className}">${message}</div>
        `
        const row = document.querySelector(".row")
        row.insertAdjacentHTML("afterbegin", alert)// alerti göster
        setTimeout(() => {
            document.querySelector(".alert").remove() //3 sn sonra aleri kapat
        }, 3000)
    }
}

// class Storage
class Storage {

    static getCourses() {
        let courses;

        if (localStorage.getItem('courses') === null) {
            courses = [];
        } else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }


    static displayCourses() {

        const courses = Storage.getCourses()
        courses.forEach(course => {
            const ui = new UI()
            ui.addCourseToList(course)
        })
    }

    static addCourse(course) {

        const courses = Storage.getCourses()
        courses.push(course)
        localStorage.setItem("courses", JSON.stringify(courses))
    }

    static deleteCourse(element) {

        if (element.classList.contains("delete")) {
            const id = element.getAttribute("data-id")

            const courses = Storage.getCourses()
            courses.forEach((course, index) => {
                if (course.courseId == id) {
                    courses.splice(index, 1)
                }
            })
            localStorage.setItem("courses",JSON.stringify(courses))
        }
    }
}

document.addEventListener("DOMContentLoaded", Storage.displayCourses)
document.getElementById("new-course").addEventListener("submit", (e) => {

    const title = document.getElementById("title").value
    const instructor = document.getElementById("instructor").value
    const image = document.getElementById("image").value


    //create course object
    const course = new Course(title, instructor, image)

    //create uı
    const ui = new UI()
    if (title === "" || image === "" || instructor === "") {
        ui.showAlert("Please Complate Form", "warning")
    } else {
        //add course to list
        ui.addCourseToList(course)

        //save to local Storage
        Storage.addCourse(course)

        //clear controls
        ui.clearControls()
        ui.showAlert("the course hasbeen added", "success")
    }


    e.preventDefault()
})

document.getElementById("course-list").addEventListener("click", (e) => {

    const ui = new UI()
    //delete course
    ui.deleteCourse(e.target)
    //delete from ls
    Storage.deleteCourse(e.target)
    ui.showAlert("the course has been deleted", "danger")
})


