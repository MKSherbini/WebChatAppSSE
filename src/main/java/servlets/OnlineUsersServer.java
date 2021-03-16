package servlets;


import com.google.gson.Gson;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import manager.ChatManager;
import models.Message;
import models.User;

import java.io.IOException;

@ServerEndpoint("/online")
public class OnlineUsersServer {

    @OnOpen
    public void onOpen(Session session) {
        System.out.println(session.getId() + " listen has opened a connection");
        ChatManager.getInstance().addListen(session);
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println(session.getId() + " listen has closed a connection");
        ChatManager.getInstance().getOnlineListeners().remove(session);
    }

}