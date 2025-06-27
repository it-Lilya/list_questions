import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { QuestionsPage } from '../../pages';
import Card from "../../widgets/Card/ui/Card";

export const MainRoutes = createBrowserRouter([
  {
    errorElement: <div>Страница не найдена!</div>,
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <QuestionsPage />,
      },
      {
        path: "card",
        element: <Card />,
      },
    ],
  },
]);
