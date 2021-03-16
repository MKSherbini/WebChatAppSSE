package servlets;


import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/startChat")
public class StartChat extends HttpServlet {
    ServletConfig myConfig;

    public void init(ServletConfig config) throws ServletException {
        myConfig = config;
    }

    public ServletConfig getServletConfig() {
        return null;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        var username = request.getParameter("Username");
        var gender = request.getParameter("Gender");
        System.out.println("request.getParameter(\"Username\") = " + username);
        System.out.println("request.getParameter(\"Gender\") = " + gender);

        request.getSession().setAttribute("username", username);
        request.getSession().setAttribute("gender", gender);
        request.getRequestDispatcher("ChatView.jsp").forward(request, response);
    }

    public String getServletInfo() {
        return null;
    }

    public void destroy() {

    }
}