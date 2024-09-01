import LogInForm from "../pages/logIn"

const Routes = [

    {
        path: "/",
        name: "login",
        element: LogInForm,
        layout: "Login"
    },
    {
        path: "/index.aspx",
        name: "home",
        element: LogInForm,
        layout: "Login"
    },
    {
        path: "/Login.aspx",
        name: "3",
        element: LogInForm,
        layout: "Login"
    },

]

export default Routes;