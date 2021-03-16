package models;

import java.util.Date;

public class Message {
    private String sender;
    private String content;
    private Date date;
    private String orientation;
    private boolean isMsg;

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    private String gender;

    @Override
    public String toString() {
        return "Message{" +
                "sender='" + sender + '\'' +
                ", content='" + content + '\'' +
                ", date=" + date +
                ", orientation='" + orientation + '\'' +
                ", isMsg=" + isMsg +
                ", gender='" + gender + '\'' +
                '}';
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getOrientation() {
        return orientation;
    }

    public void setOrientation(String orientation) {
        this.orientation = orientation;
    }

    public boolean isMsg() {
        return isMsg;
    }

    public void setMsg(boolean msg) {
        isMsg = msg;
    }
}
