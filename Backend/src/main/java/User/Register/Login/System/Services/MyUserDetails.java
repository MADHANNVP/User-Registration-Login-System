package User.Register.Login.System.Services;

import User.Register.Login.System.Model.User;
import User.Register.Login.System.Repository.UserDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class MyUserDetails implements UserDetailsService {

    @Autowired
    private UserDetailsRepo userDetailsRepo ;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDetailsRepo.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid Username");
        }
        return new MyPrinciple(user);
    }
}
