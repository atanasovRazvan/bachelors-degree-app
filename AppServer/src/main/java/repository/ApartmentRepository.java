package repository;

import model.Apartment;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import utils.HibernateSession;

import java.util.List;

public class ApartmentRepository implements RepositoryInterface<Apartment> {

    private final SessionFactory sessionFactory;

    public ApartmentRepository(){
        sessionFactory = HibernateSession.getSessionFactory();
    }

    @Override
    public List<Apartment> getAll() {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            List<Apartment> result = session.createQuery("select a from Apartment a")
                    .list();
            session.getTransaction().commit();
            return result;
        }
    }

    @Override
    public Apartment findOne(String objectId) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            List<Apartment> result = session.createQuery("select a from Apartment a where id=:id")
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
    public Apartment add(Apartment object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.save(object);
            session.getTransaction().commit();
            return object;
        }
    }

    @Override
    public Apartment update(Apartment object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.update(object);
            session.getTransaction().commit();
            return object;
        }
    }

    @Override
    public Boolean delete(Apartment object) {
        try(Session session = sessionFactory.openSession()){
            session.beginTransaction();
            session.delete(object);
            session.getTransaction().commit();
            return true;
        }
    }
}