package manager;

import com.google.gson.Gson;
import jakarta.websocket.Session;
import models.Message;
import models.User;
import jakarta.websocket.Session;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ConcurrentMap;

public class ChatManager {
    private static final ChatManager instance = new ChatManager();
    private final ConcurrentMap<Session, User> usersMap = new ConcurrentHashMap<>();
    private final ConcurrentLinkedQueue<Session> onlineListeners = new ConcurrentLinkedQueue<>();
    private final ConcurrentLinkedQueue<Message> messages = new ConcurrentLinkedQueue<>();

    private ChatManager() {
    }

    public static ChatManager getInstance() {
        return instance;
    }

    public Map<Session, User> getUsersMap() {
        return usersMap;
    }

    public void add(Session session, User user) {
        usersMap.put(session, user);
    }


    public void addListen(Session session) {
        onlineListeners.add(session);
    }

    public void notifyWithOnline() {
        onlineListeners.forEach(session -> {
            try {
                var arr = new Gson().toJson(usersMap.values().toArray());
                System.out.println("usersMap = " + usersMap);
                System.out.println("arr = " + arr);
                session.getBasicRemote().sendText(arr);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    public ConcurrentLinkedQueue<Session> getOnlineListeners() {
        return onlineListeners;
    }

    public void addMsg(Message msg) {
        messages.add(msg);
    }

    public void notifyWithMsgs(Session currentSession) {

            messages.forEach(message -> {
                try {
                    message.setOrientation("left");
                    currentSession.getBasicRemote().sendText(new Gson().toJson(message));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });


    }
}
