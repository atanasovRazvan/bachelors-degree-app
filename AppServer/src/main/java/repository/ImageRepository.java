package repository;

import model.Image;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import utils.HibernateSession;

import java.util.List;

public class ImageRepository implements RepositoryInterface<Image>{

    private final SessionFactory sessionFactory;

    public ImageRepository(){
        sessionFactory = HibernateSession.getSessionFactory();
    }

    @Override
    public List<Image> getAll() {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            List<Image> result = session.createQuery("select a from Image a")
                    .list();
            session.getTransaction().commit();
            return result;
        }
    }

    @Override
    public Image findOne(String objectId) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            List<Image> result = session.createQuery("select a from Image a where id=:id")
                    .setParameter("id", objectId)
                    .list();
            session.getTransaction().commit();
            if(result.size() == 1)
                return result.get(0);
            else
                return null;
        }
    }

    @Override
    public Image add(Image object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.save(object);
            session.getTransaction().commit();
            return object;
        }
    }

    @Override
    public Image update(Image object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.update(object);
            session.getTransaction().commit();
            return object;
        }
    }

    @Override
    public Boolean delete(Image object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.delete(object);
            session.getTransaction().commit();
            return true;
        }
    }
}
