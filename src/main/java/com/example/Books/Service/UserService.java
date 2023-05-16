package com.example.Books.Service;

import com.example.Books.Model.DTO.UserInfoDTO;
import com.example.Books.Model.UserInfo;
import com.example.Books.Repository.UserInfoRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String addUser(UserInfo userInfo){
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));

        String confirmCode = RandomStringUtils.random(10,true, false);

        userInfo.setConfirmationCode(confirmCode);
        userInfo.setConfirmCodeSend(LocalDateTime.now());

        userInfoRepository.save(userInfo);
        return userInfo.getConfirmationCode();
    }

    public String verifyUser(UserInfo userInfo, String confirmationCode){
        UserInfo user = userInfoRepository.findByUsername(userInfo.getUsername()).get();
        if (confirmationCode.equals(user.getConfirmationCode()) && Duration.between(user.getConfirmCodeSend(), LocalDateTime.now()).toMinutes()<=10){
            userInfo.setVerified(true);
            user.setVerified(true);
            userInfoRepository.save(user);
            return "User verified";
        }
        else{
            return "User not verified";
        }
    }

    public UserService(UserInfoRepository userInfoRepository, PasswordEncoder passwordEncoder) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public UserInfo getUserByUsername(String username){
        return userInfoRepository.findByUsername(username).get();
    }

    public UserInfo getUserByID(Long id){
        return userInfoRepository.findById(id).get();
    }

    public UserInfoDTO getUserInfoDTO(Long id){
        UserInfo userInfo = userInfoRepository.findById(id).get();
        UserInfoDTO userInfoDTO = new UserInfoDTO(userInfo.getUsername(),
                userInfo.getEmail(),
                userInfo.getBio(),
                userInfo.getLocation(),
                userInfo.getAge());
        return userInfoDTO;
    }

    public List<UserInfo> gimmeAllDemBoys(){
        return this.userInfoRepository.findAll();
    }
}
