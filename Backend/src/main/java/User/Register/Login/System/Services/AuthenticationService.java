package User.Register.Login.System.Services;

import User.Register.Login.System.Model.User;
import User.Register.Login.System.Repository.UserDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserDetailsRepo userDetailsRepo ;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder ;

    @Autowired
    private JwtService jwtService ;

    public ResponseEntity<String> signup(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDetailsRepo.save(user);
        return ResponseEntity.ok("Register Successfully");
    }

    public ResponseEntity<String> signin(User user) {
        User exist = userDetailsRepo.findByUsername(user.getUsername());

        if(exist == null){
            return ResponseEntity.status(401).body("UserName Not Found");
        }

        if(!passwordEncoder.matches(user.getPassword() , exist.getPassword())){
            return ResponseEntity.status(401).body("Invalid Password");
        }
        return ResponseEntity.ok(jwtService.generateToken(user.getUsername()));
    }

    public ResponseEntity<User> dashboard(String token) {
        String username = jwtService.extractUsername(token);
        User user = userDetailsRepo.findByUsername(username);
        user.setPassword("");
        return ResponseEntity.ok(user) ;
    }
}
