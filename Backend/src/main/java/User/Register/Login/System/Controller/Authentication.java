package User.Register.Login.System.Controller;

import User.Register.Login.System.Model.User;
import User.Register.Login.System.Services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class Authentication {

    @Autowired
    private AuthenticationService authenticationService ;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user){
       return authenticationService.signup(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<String> signin(@RequestBody User user){
        return authenticationService.signin(user);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<User> dashboard(@RequestHeader("Authorization") String authHeader){
        String token = authHeader.substring(7);
         return authenticationService.dashboard(token);
    }
}
