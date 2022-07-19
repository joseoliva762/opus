import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
// Lazy components
const Layout = React.lazy(() => import('./components/Layout'));
const Tasks = React.lazy(() => import('./components/Tasks'));
const TaskForm = React.lazy(() => import('./components/TaskForm'));


function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="bg-gray-900 flex flex-col gap-1 items-flex justify-start min-h-screen text-white w-full">
        <Router>
          <Layout>
            <Routes>
              <Route exact  path="/" >
                <Route exact index element={<Navigate to="/tasks" />} />
                <Route exact path="/tasks" element={<Tasks />} />
                <Route exact path="/tasks/deleted" element={<Tasks tasksDeleted />} />
                <Route exact path="/task/create" element={<TaskForm />} />
                <Route exact path="/tasks/:taskId" element={<TaskForm />} />
              </Route>
            </Routes>
          </Layout>
        </Router>
     </div>
    </Suspense>
  )
}

export default App
