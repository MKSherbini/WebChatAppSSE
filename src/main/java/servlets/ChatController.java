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
import java.util.ArrayList;
import java.util.concurrent.*;

@WebServlet("/SSEChatView")
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

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");

        var writer = response.getWriter();

        String lastEventId = request.getHeader("Last-Event-ID");
        var session = request.getSession();
        var username = (String) session.getAttribute("username");
        var gender = (String) session.getAttribute("gender");

        boolean changed = false;
        if (lastEventId == null) {
            changed = true;
            usersMap.put(session, new User(username, gender));
//            ChatManager.getInstance().add(session, new User((String) session.getAttribute("Username"), (String) session.getAttribute("Gender")));
            lastEventId = "0";
//            writer.write("id: "+lastEventId+"\n");
        }
            writer.write("event: updateOnlineUsers\n");
            System.out.println("event: updateOnlineUsers");
            writer.write("data: " + new Gson().toJson(usersMap.values().toArray()) + "\n\n");
            System.out.println("data: " + new Gson().toJson(usersMap.values().toArray()));
            System.out.println("liveSession = " + username);



        var messagesArr = new ArrayList<Message>();
        for (int i = Integer.parseInt(lastEventId); i < messages.size(); i++) {
            changed = true;
            var msg = messages.get(i);
            if(!msg.getSender().equals(username)){
                msg.setOrientation("left");
            }else {
                msg.setOrientation("Right");
            }
//            writer.write("event: updateMessages\n");
//            writer.write("data: " + new Gson().toJson(msg) + "\n");
            messagesArr.add(msg);
            System.out.println("event: updateMessages");
            System.out.println("data: " + new Gson().toJson(msg));
        }
        if(messagesArr.size()>0){
            writer.write("event: updateMessages\n");
            writer.write("data: " + new Gson().toJson(messagesArr) + "\n");

        }

        if (changed) {
            writer.write("id: " + messages.size() + "\n\n");
            System.out.println("id: " + messages.size());

        }

        writer.flush();
        writer.close();
    }

    public String getServletInfo() {
        return null;
    }

    public void destroy() {

    }
}