package repository;

import java.util.List;

public interface RepositoryInterface<TYPE> {

    List<TYPE> getAll();
    TYPE findOne(String objectId);
    TYPE add(TYPE object);
    TYPE update(TYPE object);
    Boolean delete(TYPE objectId);

}
