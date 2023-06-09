import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import ClassroomDetail from "./routes/ClassroomDetail.jsx";
import ClassroomList from "./routes/ClassroomList.jsx";
import ClassroomCreate, { action as createClassroomAction } from "./routes/ClassroomCreate.jsx";
import TeamDetail from "./routes/TeamDetail.jsx";
import ImportStudentsFromBlackboard, {
  action as importAction,
} from "./routes/ImportStudentsFromBlackboard.jsx";
import MilestoneDetail from "./routes/MilestoneDetail.jsx";
import ErrorPage from "./ErrorPage.jsx";

import { getClassrooms, getClassroom } from "./api/classrooms.js";

async function classroomsLoader() {
  const classrooms = await getClassrooms();
  return { classrooms };
}

async function classroomLoader({ params }) {
  const classroom = await getClassroom(params.classroomId);
  return { classroom };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/hello-world",
    element: <div>Hello world!</div>,
  },
  {
    path: "/classrooms/",
    loader: classroomsLoader,
    element: <ClassroomList />,
  },
  {
    path: "/classrooms/new",
    element: <ClassroomCreate />,
    action: createClassroomAction,
  },
  {
    path: "/classrooms/:classroomId",
    loader: classroomLoader,
    element: <ClassroomDetail />,
  },
  {
    path: "/classrooms/:classroomId/import/students-from-bb",
    loader: classroomLoader,
    element: <ImportStudentsFromBlackboard />,
    action: importAction,
  },
  {
    path: "/classrooms/:classroomId/milestones/",
    element: <div>Full list of milestones + tool to edit + tool to delete</div>,
  },
  {
    path: "/classrooms/:classroomId/milestones/new",
    element: <div>New milestone page</div>,
  },
  {
    path: "/classrooms/:classroomId/milestones/:milestoneId",
    element: <MilestoneDetail />,
  },
  {
    path: "/classrooms/:classroomId/milestones/:milestoneId/productivity",
    element: <div>Commit frequency page + filter: all-team, fuzzy-search</div>,
  },
  {
    path: "/classrooms/:classroomId/teams/",
    element: <div>Full list of team + tool to edit + tool to delete</div>,
  },
  {
    path: "/classrooms/:classroomId/teams/new",
    element: <div>New team page</div>,
  },
  {
    path: "/classrooms/:classroomId/teams/:teamId",
    element: <TeamDetail />,
  },
  {
    path: "/classrooms/:classroomId/students",
    element: (
      <div>
        Student list + pagination + tool: fuzzy search (email handle,
        username(s)) + tool: add/import + tool: edit + tool: delete + tool:
        username checker
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
