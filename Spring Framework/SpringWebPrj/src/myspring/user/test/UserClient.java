package myspring.user.test;

import static org.junit.Assert.assertEquals;
import java.sql.SQLException;
import javax.sql.DataSource;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import myspring.user.service.UserService;
import myspring.user.vo.UserVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:config/beans.xml")
public class UserClient {
	
	@Autowired
	ApplicationContext ac;
	
	@Autowired
	UserService service;
	
	@Test
	@Ignore
	public void updateUserTest() {
		service.updateUser(new UserVO("gildong", "홍길동", "남", "서울"));
		
	}

	@Test
	@Ignore
	public void insertUserTest() {
		service.insertUser(new UserVO("dooly", "둘리", "남", "경기"));
		for(UserVO user : service.getUserList()) {
			System.out.println(user);
		}
	}

	@Test
	public void getUserTest() {
		UserVO user = service.getUser("gildong");
		System.out.println(user);
		assertEquals("홍길동", user.getName());
	}

	@Test
	public void dataSourceTest() {
		DataSource dataSource = (DataSource)ac.getBean("dataSource");
		try {
			System.out.println(dataSource.getConnection());
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
	}

	@Test
	@Ignore
	public void deleteUserTest() {
		service.deleteUser("dooly");
		for(UserVO user : service.getUserList()) {
			System.out.println(user);
		}
	}

}
