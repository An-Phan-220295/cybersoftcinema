package com.cybersoft.cybersoftcinema.provider;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.service.imp.LoginServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomAuthenProvider implements AuthenticationProvider {

    @Autowired
    @Lazy
    private LoginServiceImp loginServiceImp;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        UsersEntity user = loginServiceImp.checkSignIn(username);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                List<GrantedAuthority> roles = new ArrayList<>();
                GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRoleEntity().getName());
                roles.add(grantedAuthority);
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, user.getPassword(), roles);

                SecurityContextHolder.getContext().setAuthentication(token);

                return token;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
