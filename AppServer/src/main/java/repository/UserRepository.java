package repository;

import model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import utils.HibernateSession;

import java.util.List;

public class UserRepository implements RepositoryInterface<User>{

    private final SessionFactory sessionFactory;

    public UserRepository(){
        sessionFactory = HibernateSession.getSessionFactory();
    }

    @Override
    public List<User> getAll() {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            List<User> result = session.createQuery("select a from User a")
                    .list();
            session.getTransaction().commit();
            return result;
        }
    }

    @Override
    public User findOne(String objectId) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            List<User> result = session.createQuery("select a from User a where username=:username")
                    .setParameter("username", objectId)
                    .list();
            session.getTransaction().commit();
            if(result.size() == 1)
                return result.get(0);
            else
                return null;
        }
    }

    @Override
    public User add(User object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.save(object);
            session.getTransaction().commit();
            return object;
        }
    }

    @Override
    public User update(User object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.update(object);
            session.getTransaction().commit();
            return object;
        }
    }

    @Override
    public Boolean delete(User object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.delete(object);
            session.getTransaction().commit();
            return true;
        }
    }
}
