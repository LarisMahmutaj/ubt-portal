import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import EmailConfirmed from './views/EmailConfirmed.vue';
import Courses from './views/courses/Courses.vue';
import Course from './views/courses/Course.vue';
import CreateCourse from './views/courses/CreateCourse.vue';
import JoinedCourses from './views/courses/JoinedCourses.vue';
import MyCourses from './views/courses/MyCourses.vue';
import Invites from './views/courses/Invites.vue';

export const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/register', name: 'register', component: Register },
  { path: '/', name: 'login', component: Login },
  {
    path: '/email-confirmed',
    name: 'emailConfirmed',
    component: EmailConfirmed,
  },
  { path: '/courses', name: 'courses', component: Courses },
  {
    path: '/course/:courseId',
    name: 'course',
    component: Course,
    params: true,
  },
  { path: '/create-course', name: 'createCourse', component: CreateCourse },
  { path: '/joined-courses', name: 'joinedCourses', component: JoinedCourses },
  { path: '/my-courses', name: 'myCourses', component: MyCourses },
  { path: '/invites', name: 'invites', component: Invites },
];
