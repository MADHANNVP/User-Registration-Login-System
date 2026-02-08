package User.Register.Login.System.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class Home {

    @GetMapping("/")
    public String home(){
        return "Home";
    }

    @GetMapping("/about")
    public String about(){
        return "about";
    }
}
