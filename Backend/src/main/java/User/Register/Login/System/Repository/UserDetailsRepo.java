package User.Register.Login.System.Repository;

import User.Register.Login.System.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepo extends JpaRepository<User , Long> {
    User findByUsername(String username);
}
