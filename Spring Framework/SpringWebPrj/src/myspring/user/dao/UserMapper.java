package myspring.user.dao;

import java.util.List;
import myspring.user.vo.UserVO;

public interface UserMapper {
	
	void insertUser(UserVO user);
	void updateUser(UserVO user);
	void deleteUser(String id);
	UserVO selectUserById(String id);
	List<UserVO> selectUserList();
}
