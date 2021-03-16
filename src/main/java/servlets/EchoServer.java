package servlets;


import com.google.gson.Gson;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import manager.ChatManager;
import models.Message;
import models.User;

import java.io.IOException;

@ServerEndpoint("/echo")
public class EchoServer {
    static int i = 1;

    @OnOpen
    public void onOpen(Session session) {
        ChatManager.getInstance().add(session, new User("user" + EchoServer.i, "gender" + EchoServer.i));
        EchoServer.i++;
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("before "+message);
//        User currentUser = ChatManager.getInstance().getUsersMap().get(session);
        Message receivedMsg = new Gson().fromJson(message, Message.class);
        System.out.println("after "+receivedMsg);

        if (receivedMsg.isMsg()) {
            ChatManager.getInstance().addMsg(receivedMsg);
            ChatManager.getInstance().getUsersMap().forEach((otherSession, user) -> {
                try {

                    if (!otherSession.getId() .equals( session.getId())) {
                        receivedMsg.setOrientation("left");
                    }
                    otherSession.getBasicRemote().sendText(new Gson().toJson(receivedMsg));
                    receivedMsg.setOrientation("Right");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        } else {
            ChatManager.getInstance().getUsersMap().get(session).setName(receivedMsg.getSender());

            ChatManager.getInstance().getUsersMap().get(session).setGender(receivedMsg.getGender());
            ChatManager.getInstance().notifyWithOnline();
            ChatManager.getInstance().notifyWithMsgs(session);
        }
    }

    @OnClose
    public void onClose(Session session) {
        ChatManager.getInstance().getUsersMap().remove(session);
        ChatManager.getInstance().notifyWithOnline();
    }

}