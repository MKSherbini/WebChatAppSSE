package servlets;


import com.google.gson.Gson;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import manager.ChatManager;
import models.Message;
import models.User;

import java.io.IOException;
import java.util.concurrent.*;

@WebServlet("/server")
public class ChatController extends HttpServlet {
    public static final ConcurrentMap<HttpSession, User> usersMap = new ConcurrentHashMap<>();
    public static final CopyOnWriteArrayList<Message> messages = new CopyOnWriteArrayList<>();

    ServletConfig myConfig;

    public void init(ServletConfig config) throws ServletException {
        myConfig = config;
    }

    public ServletConfig getServletConfig() {
        return null;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");

        var writer = response.getWriter();

        String lastEventId = request.getHeader("Last-Event-ID");
        var session = request.getSession();
        var username = (String) session.getAttribute("Username");
        var gender = (String) session.getAttribute("Gender");

        if (lastEventId == null) {
            usersMap.put(session, new User(username, gender));
//            ChatManager.getInstance().add(session, new User((String) session.getAttribute("Username"), (String) session.getAttribute("Gender")));
            lastEventId = "0";
            writer.write("event: onlineUpdate\n");
            writer.write("data: " + new Gson().toJson(usersMap.values().toArray()) + "\n\n");
            System.out.println("liveSession = " + username);
        }

        boolean changed = false;
        for (int i = Integer.parseInt(lastEventId); i < messages.size(); i++) {
            changed = true;
            var msg = messages.get(i);
            writer.write("event: chatUpdate\n");
            writer.write("data: " + new Gson().toJson(msg) + "\n");
        }
        if (changed)
            writer.write("id: " + messages.size() + "\n\n");

    }

    public String getServletInfo() {
        return null;
    }

    public void destroy() {

    }
}